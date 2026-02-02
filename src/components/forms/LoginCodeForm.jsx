import { useContext, useState, useRef } from "react";
import { Alert, Box, Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { getAllAssessments, requestLoginCode, verifyLoginCode } from "../../axios/axiosFunctions";
import { AssessmentContext } from "../../context/assessment";

const LoginCodeForm = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const { setCurrentAssessment } = useContext(AssessmentContext);

    const [step, setStep] = useState("email"); // "email" or "code"
    const [email, setEmail] = useState("");
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [loading, setLoading] = useState(false);

    const inputRefs = useRef([]);

    const showErrorMessage = (msg) => {
        setError(msg);
        setShowError(true);
        setTimeout(() => {
            setShowError(false);
        }, 4000);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const result = await requestLoginCode({ email });

        setLoading(false);

        if (result.msg === "Code sent successfully") {
            setStep("code");
        } else {
            showErrorMessage(result.msg || "Failed to send code");
        }
    };

    const handleCodeChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleCodeKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleCodePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").trim();

        // Check if pasted data is exactly 6 digits
        if (/^\d{6}$/.test(pastedData)) {
            const newCode = pastedData.split("");
            setCode(newCode);
            inputRefs.current[5]?.focus();
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        const fullCode = code.join("");

        if (fullCode.length !== 6) {
            showErrorMessage("Please enter the complete 6-digit code");
            return;
        }

        setLoading(true);

        const result = await verifyLoginCode({ email, code: fullCode });

        setLoading(false);

        if (result.user) {
            setCurrentUser(result.user);
            localStorage.setItem("userRiseUp", JSON.stringify(result.user));

            const assessment = await getAllAssessments();
            if (assessment) {
                setCurrentAssessment(assessment[0]);
            }

            navigate("/");
        } else {
            showErrorMessage(result.msg || "Invalid code");
            // Reset to email step on invalid code
            setStep("email");
            setCode(["", "", "", "", "", ""]);
        }
    };

    const handleBackToEmail = () => {
        setStep("email");
        setCode(["", "", "", "", "", ""]);
        setShowError(false);
    };

    return (
        <Box sx={{ margin: "20px 0px" }}>
            {step === "email" ? (
                <form onSubmit={handleEmailSubmit}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                type="email"
                                value={email}
                                onChange={handleEmailChange}
                                name="email"
                                label="Email address"
                                color="primary"
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        sx={{ marginTop: { xs: "20px", sm: "50px" }, marginBottom: "10px" }}
                        size="large"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                    >
                        {loading ? "SENDING..." : "LOG IN"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handleCodeSubmit}>
                    <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="body1" sx={{ color: "#666", mb: 2 }}>
                            You have received an email with a code to access
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#999" }}>
                            Sent to: {email}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: { xs: 1, sm: 2 },
                            mb: 3,
                        }}
                        onPaste={handleCodePaste}
                    >
                        {code.map((digit, index) => (
                            <TextField
                                key={index}
                                inputRef={(el) => (inputRefs.current[index] = el)}
                                value={digit}
                                onChange={(e) => handleCodeChange(index, e.target.value)}
                                onKeyDown={(e) => handleCodeKeyDown(index, e)}
                                inputProps={{
                                    maxLength: 1,
                                    style: {
                                        textAlign: "center",
                                        fontSize: "24px",
                                        fontWeight: "bold",
                                        padding: "12px",
                                    },
                                }}
                                sx={{
                                    width: { xs: "45px", sm: "55px" },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderWidth: "2px",
                                        },
                                    },
                                }}
                                disabled={loading}
                            />
                        ))}
                    </Box>

                    <Button
                        type="submit"
                        sx={{ marginTop: "20px", marginBottom: "10px" }}
                        size="large"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={loading}
                    >
                        {loading ? "VERIFYING..." : "VERIFY CODE"}
                    </Button>

                    <Button
                        type="button"
                        onClick={handleBackToEmail}
                        sx={{ marginBottom: "10px" }}
                        size="small"
                        fullWidth
                        variant="text"
                        color="primary"
                        disabled={loading}
                    >
                        Use a different email
                    </Button>
                </form>
            )}

            {showError && (
                <Alert sx={{ marginTop: "20px" }} severity="error">
                    {error}
                </Alert>
            )}
        </Box>
    );
};

export default LoginCodeForm;
