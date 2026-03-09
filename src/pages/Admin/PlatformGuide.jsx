import { useState } from "react";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Paper,
  Chip,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";
import EmailIcon from "@mui/icons-material/Email";
import BarChartIcon from "@mui/icons-material/BarChart";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const sectionStyle = {
  mb: 4,
  p: 3,
  borderRadius: 2,
  backgroundColor: "#fafafa",
  border: "1px solid #e0e0e0",
};

const headingStyle = {
  fontWeight: 600,
  color: "secondary.main",
  mb: 2,
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const PlatformGuide = () => {
  const [expandedFaq, setExpandedFaq] = useState(false);

  const handleFaqChange = (panel) => (_, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ maxWidth: 900 }}>
      <Typography variant="h3" fontWeight={500} color="secondary" sx={{ mb: 1 }}>
        Platform Guide
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Everything you need to know to manage assessments on the Rise Up Culture platform.
      </Typography>

      {/* ───── OVERVIEW ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <AssignmentIcon /> Platform Overview
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The Rise Up Culture Assessment Platform helps individuals discover their
          Kingdom Calling through structured assessments. The platform evaluates
          participants across three key dimensions:
        </Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          <Chip label="Sphere of Influence" variant="outlined" />
          <Chip label="5-Fold Personality" variant="outlined" />
          <Chip label="Biblical DNA" variant="outlined" />
        </Box>
        <Typography variant="body2" color="text.secondary">
          Each assessment contains 60 questions (2 demographic, 18 Sphere of Influence,
          20 Five-Fold Personality, and 20 Biblical DNA). Upon completion, the user
          receives a personalized report with their results and a downloadable PDF.
        </Typography>
      </Box>

      {/* ───── TWO ASSESSMENT TYPES ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <BarChartIcon /> Assessment Types
        </Typography>

        {/* Self-Assessment */}
        <Paper elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            1. Self-Assessment
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The core assessment. Each user created on the platform automatically
            receives a self-assessment. The user answers 60 questions about
            themselves, and the platform generates a personal report based on their
            answers.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This is the default assessment and does not require any additional setup
            beyond creating the user.
          </Typography>
        </Paper>

        {/* 360 Assessment */}
        <Paper elevation={0} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
            2. 360-Degree Review
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            An extended assessment where the user invites peers, colleagues, or
            leaders to evaluate them. The user completes their self-assessment first,
            then invites reviewers who answer the same questions about the user.
          </Typography>
          <Typography variant="body2" fontWeight={500} sx={{ mt: 1 }}>
            Requirements to generate the 360 report:
          </Typography>
          <Box component="ul" sx={{ mt: 0.5, pl: 3 }}>
            <li>
              <Typography variant="body2">The user must complete their personal self-assessment.</Typography>
            </li>
            <li>
              <Typography variant="body2">At least 3 reviewers must complete their submissions.</Typography>
            </li>
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Once both requirements are met, a "Generate Report" button becomes
            active, allowing the user to create their 360 report comparing
            self-perception with how others see them.
          </Typography>
        </Paper>
      </Box>

      {/* ───── HOW USERS ARRIVE ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <PersonAddIcon /> How Users Get on the Platform
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          There are two ways users arrive on the platform:
        </Typography>

        <Paper elevation={0} sx={{ p: 2, mb: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Option A: Automatic via LearnWorlds
          </Typography>
          <Typography variant="body2">
            When someone purchases an assessment through LearnWorlds, the user is
            automatically created on the platform. These users appear in your user
            table with a "LearnWorlds" tag indicating the source.
          </Typography>
        </Paper>

        <Paper elevation={0} sx={{ p: 2, border: "1px solid #e0e0e0", borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight={600}>
            Option B: Admin Creates Manually
          </Typography>
          <Typography variant="body2">
            As an admin, you can directly create users by going to the "Users" page
            in the sidebar and filling out the Create User form. This is the most
            common method when managing assessments for a group or organization.
          </Typography>
        </Paper>
      </Box>

      {/* ───── STEP BY STEP: CREATING A USER ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <PersonAddIcon /> Creating a User (Step by Step)
        </Typography>
        <Stepper orientation="vertical" activeStep={-1}>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Navigate to the Users page</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Click "Users" in the left sidebar to access the Create User form.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Fill in user details</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Enter the user's first name, last name, and email address.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Choose assessment type</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The self-assessment is assigned by default. If you also want to enable
                the 360-degree review, toggle the "Enable 360 Review" option.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Click Create</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The user is now active on the platform. You can verify in the Home
                table — the "360" column will show "Yes" or "No" based on your
                selection.
              </Typography>
            </StepContent>
          </Step>
        </Stepper>
      </Box>

      {/* ───── USER EXPERIENCE FLOW ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <CheckCircleOutlineIcon /> What the User Sees
        </Typography>

        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          Self-Assessment Flow
        </Typography>
        <Stepper orientation="vertical" activeStep={-1} sx={{ mb: 3 }}>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Login</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The user receives a one-time login code via email and enters it on the
                platform. No password is needed.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Take the assessment</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The user is taken directly to their assessment — a step-by-step
                questionnaire with 60 questions organized by section.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>View the report</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                After completing all questions, a self-assessment report is generated
                showing their results across all three dimensions.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Download PDF</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The user can prepare and download a PDF version of their report for
                offline reference.
              </Typography>
            </StepContent>
          </Step>
        </Stepper>

        <Divider sx={{ my: 2 }} />

        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>
          360-Degree Review Flow (after completing self-assessment)
        </Typography>
        <Stepper orientation="vertical" activeStep={-1}>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Access 360 section</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                After completing the self-assessment, the user sees a new option:
                "My 360 Degree Report — Manage your 360 Degree Review."
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Add reviewers</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The user adds reviewers one by one, entering each reviewer's email
                address. There is no limit to how many reviewers can be added.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Send invitations</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The user clicks "Invite All" to send email invitations to every
                reviewer at once. They can also send individual invitations or reminder
                emails later.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Track reviewer progress</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Each reviewer's status is visible: Pending (not started), In Progress,
                or Completed. Reminder emails can be sent to reviewers who haven't
                finished.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Generate 360 report</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Once at least 3 reviewers have completed their submission, the
                "Generate Report" button becomes active. The resulting report compares
                the user's self-assessment with the feedback from their reviewers.
              </Typography>
            </StepContent>
          </Step>
        </Stepper>
      </Box>

      {/* ───── REVIEWER EXPERIENCE ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <EmailIcon /> How Reviewers Participate
        </Typography>
        <Stepper orientation="vertical" activeStep={-1}>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Reviewer receives email</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Each reviewer gets an email saying they have been selected as a
                participant for someone's 360-degree review, with a direct link.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Click the link</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                The link opens the assessment directly — no account creation or login
                is needed. The reviewer simply answers the questions.
              </Typography>
            </StepContent>
          </Step>
          <Step active>
            <StepLabel>
              <Typography fontWeight={500}>Complete the assessment</Typography>
            </StepLabel>
            <StepContent>
              <Typography variant="body2">
                Once the reviewer submits their answers, their status changes to
                "Completed" on the user's 360 management page.
              </Typography>
            </StepContent>
          </Step>
        </Stepper>
      </Box>

      {/* ───── ADMIN TABLE ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <GroupIcon /> Managing Users (Home Table)
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The Home page displays a table of all users on the platform. From this
          table you can:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>View user details</strong> — name, email, and whether the 360 review is enabled.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Edit a user</strong> — update their information or enable/disable the 360 review.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Delete a user</strong> — remove them from the platform entirely.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Search & filter</strong> — use the toolbar to find specific users quickly.
            </Typography>
          </li>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Users that came through LearnWorlds will be tagged accordingly so you can
          identify the source.
        </Typography>
      </Box>

      {/* ───── EMAIL NOTIFICATIONS ───── */}
      <Box sx={sectionStyle}>
        <Typography variant="h5" sx={headingStyle}>
          <EmailIcon /> Email Notifications
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          The platform sends automated emails at key moments:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Login code</strong> — sent when a user requests to log in.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>360 activation</strong> — notifies the user when their 360 review has been enabled, inviting them to log in and add reviewers.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Reviewer invitation</strong> — sent to each reviewer with a direct link to complete the assessment.
            </Typography>
          </li>
          <li>
            <Typography variant="body2" sx={{ mb: 0.5 }}>
              <strong>Reminder emails</strong> — can be sent individually to reviewers who haven't completed their submission yet.
            </Typography>
          </li>
        </Box>
      </Box>

      {/* ───── FAQ ───── */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ ...headingStyle, mb: 3 }}>
          <HelpOutlineIcon /> Frequently Asked Questions
        </Typography>

        <Accordion expanded={expandedFaq === "faq1"} onChange={handleFaqChange("faq1")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>How does user login work?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Users do not have a traditional password. When they visit the platform,
              they enter their email address and receive a one-time code via email.
              They enter this code to log in. This keeps the experience simple and
              secure.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq2"} onChange={handleFaqChange("faq2")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Can I enable the 360 review after the user is already created?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Yes. You can edit any existing user from the Home table and toggle the
              "Enable 360 Review" option at any time. The user will receive a
              notification email and can then start adding reviewers.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq3"} onChange={handleFaqChange("faq3")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Does the user need to complete the self-assessment before the 360?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Yes. The self-assessment must be completed first. It is one of the two
              requirements for generating the 360 report (the other being at least 3
              completed reviewer submissions).
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq4"} onChange={handleFaqChange("faq4")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>How many reviewers are needed for the 360 report?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              A minimum of 3 reviewers must complete their submissions before the 360
              report can be generated. The user can invite more than 3, but at least 3
              must finish.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq5"} onChange={handleFaqChange("faq5")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Do reviewers need an account on the platform?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              No. Reviewers receive an email with a unique link that takes them
              directly to the assessment. They do not need to create an account or log
              in — they simply complete the questions and submit.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq6"} onChange={handleFaqChange("faq6")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Can I resend an invitation to a reviewer?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Yes. The user can send individual reminder emails to any reviewer whose
              status is still "Pending" or "In Progress" from the 360 management page.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq7"} onChange={handleFaqChange("faq7")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>What are the three assessment dimensions?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Sphere of Influence</strong> — identifies where you are called to
              lead and make an impact (e.g., business, education, family, church).
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>5-Fold Personality</strong> — evaluates your gifts across five
              biblical leadership roles: apostolic, prophetic, evangelistic, shepherd,
              and teacher.
            </Typography>
            <Typography variant="body2">
              <strong>Biblical DNA</strong> — reveals which biblical leaders reflect
              your unique combination of gifts and calling.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq8"} onChange={handleFaqChange("faq8")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>Can the user download their report?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Yes. After completing the assessment, the user can generate and download
              a PDF version of their report. The report includes all results across
              the three dimensions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq9"} onChange={handleFaqChange("faq9")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>What happens if a user was created through LearnWorlds?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Users who purchase an assessment through LearnWorlds are automatically
              added to the platform. They will appear in your Home table with a
              "LearnWorlds" tag. You manage them the same way as manually created
              users.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expandedFaq === "faq10"} onChange={handleFaqChange("faq10")}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={500}>How do I access the admin panel?</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">
              Navigate to /admin on the platform URL. Enter your admin email, receive
              a login code, and use it to access the admin dashboard. Only users with
              the admin role can access this area.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default PlatformGuide;
