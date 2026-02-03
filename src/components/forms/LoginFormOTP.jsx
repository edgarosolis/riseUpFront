import { useContext, useState, useEffect } from "react";
import { Alert, Box, Button, Grid, TextField, Typography, CircularProgress } from "@mui/material";
import { Email, Lock, ArrowBack } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user";
import { getAllAssessments, requestOTP, verifyOTP } from "../../axios/axiosFunctions";
import { AssessmentContext } from "../../context/assessment";

const LoginFormOTP = () => {
    const navigate = useNavigate();
    const { setCurrentUser } = useContext(UserContext);
    const { setCurrentAssessment } = useContext(AssessmentContext);

    // Form state
    const [step, setStep] = useState(1); // 1 = email, 2 = OTP code
    const [email, setEmail] = useState("");
    const [otpCode, setOtpCode] = useState("");

    // UI state
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showError, setShowError] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [showSuccess, setShowSuccess] = useState(false);

    // Timer state
    const [countdown, setCountdown] = useState(0);
    const [canResend, setCanResend] = useState(false);

    // Countdown timer effect
    useEffect(() => {
        let timer;
        if (countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (step === 2) {
            setCanResend(true);
        }
        return () => clearTimeout(timer);
    }, [countdown, step]);

    const showErrorMessage = (msg) => {
        setError(msg);
        setShowError(true);
        setTimeout(() => setShowError(false), 4000);
    };

    const showSuccessMessage = (msg) => {
        setSuccessMsg(msg);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 4000);
    };

    const handleRequestOTP = async (e) => {
        e.preventDefault();

        if (!email) {
            showErrorMessage("Please enter your email address");
            return;
        }

        setIsLoading(true);
        const result = await requestOTP(email);
        setIsLoading(false);

        if (result.msg && result.msg.includes("sent")) {
            setStep(2);
            setCountdown(120); // 2 minutes cooldown for resend
            setCanResend(false);
            showSuccessMessage("Verification code sent to your email");
        } else {
            showErrorMessage(result.msg || "Failed to send verification code");
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();

        if (!otpCode || otpCode.length !== 6) {
            showErrorMessage("Please enter the 6-digit verification code");
            return;
        }

        setIsLoading(true);
        const result = await verifyOTP(email, otpCode);
        setIsLoading(false);

        const { user, msg } = result;

        if (!user) {
            showErrorMessage(msg || "Verification failed");
            return;
        }

        // Login successful
        setCurrentUser(user);
        localStorage.setItem('userRiseUp', JSON.stringify(user));

        // Get assessment (same as original LoginForm)
        const assessment = await getAllAssessments();
        if (assessment) {
            setCurrentAssessment(assessment[0]);
        }

        navigate('/');
    };

    const handleResendOTP = async () => {
        if (!canResend) return;

        setIsLoading(true);
        const result = await requestOTP(email);
        setIsLoading(false);

        if (result.msg && result.msg.includes("sent")) {
            setCountdown(120);
            setCanResend(false);
            setOtpCode("");
            showSuccessMessage("New verification code sent");
        } else {
            showErrorMessage(result.msg || "Failed to resend code");
        }
    };

    const handleBack = () => {
        setStep(1);
        setOtpCode("");
        setCountdown(0);
        setCanResend(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <Box sx={{ margin: "20px 0px" }}>
            {step === 1 ? (
                // Step 1: Email Entry
                <form onSubmit={handleRequestOTP}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                Enter your e-mail address and we'll send you a verification code.
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                name='email'
                                type="email"
                                label="Email address"
                                color="primary"
                                InputProps={{
                                    startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        sx={{ marginTop: { xs: "20px", sm: "50px" }, marginBottom: "10px" }}
                        size="large"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "SEND CODE"}
                    </Button>
                </form>
            ) : (
                // Step 2: OTP Verification
                <form onSubmit={handleVerifyOTP}>
                    <Grid container spacing={2}>
                        <Grid size={12}>
                            <Button
                                startIcon={<ArrowBack />}
                                onClick={handleBack}
                                sx={{ mb: 1 }}
                                color="primary"
                            >
                                Back
                            </Button>
                        </Grid>
                        <Grid size={12}>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                                We sent a verification code to:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold" sx={{ mb: 2 }}>
                                {email}
                            </Typography>
                        </Grid>
                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                value={otpCode}
                                onChange={(e) => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                                    setOtpCode(value);
                                }}
                                name='otpCode'
                                label="6-digit verification code"
                                color="primary"
                                inputProps={{
                                    maxLength: 6,
                                    style: { letterSpacing: '8px', fontSize: '24px', textAlign: 'center' }
                                }}
                                InputProps={{
                                    startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />
                                }}
                            />
                        </Grid>
                        <Grid size={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                <Typography variant="body2" color="textSecondary">
                                    {countdown > 0
                                        ? `Code expires in ${formatTime(countdown)}`
                                        : "Code expired"
                                    }
                                </Typography>
                                <Button
                                    onClick={handleResendOTP}
                                    disabled={!canResend || isLoading}
                                    size="small"
                                    color="primary"
                                >
                                    Resend Code
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Button
                        type='submit'
                        sx={{ marginTop: { xs: "20px", sm: "30px" }, marginBottom: "10px" }}
                        size="large"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={isLoading || otpCode.length !== 6}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : "VERIFY & LOG IN"}
                    </Button>
                </form>
            )}

            {showError && (
                <Alert sx={{ marginTop: "20px" }} severity="error">
                    {error}
                </Alert>
            )}

            {showSuccess && (
                <Alert sx={{ marginTop: "20px" }} severity="success">
                    {successMsg}
                </Alert>
            )}
        </Box>
    );
};

export default LoginFormOTP;
