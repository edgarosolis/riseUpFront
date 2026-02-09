# RiseUpFront - Kingdom Calling Assessment Platform

## Overview

RiseUpFront is the frontend application for the Kingdom Calling Assessment platform by The Rise Up Culture. It provides an interactive assessment experience where users can complete sections, answer questions, and receive personalized reports.

## Tech Stack

- **React** 19.2.3 - UI framework
- **React Router** 7.12.0 - Client-side routing
- **Material UI** 7.3.7 - Component library and styling
- **Axios** 1.13.2 - HTTP client for API communication
- **@react-pdf/renderer** 4.3.2 - PDF generation for reports
- **react-player** 3.4.0 - Video playback component

## Project Structure

```
src/
├── assets/           # Static assets (images, icons)
├── axios/            # API configuration and functions
│   └── axiosFunctions.js
├── components/       # Reusable UI components
│   ├── Banners/      # Banner components
│   ├── Cards/        # Card components
│   ├── forms/        # Form components
│   ├── navigation/   # Navigation (NavBar)
│   ├── PDF/          # PDF generation components
│   ├── Tables/       # Table components
│   ├── Texts/        # Text display components
│   └── Video/        # Video player components
├── context/          # React Context providers
│   ├── user.jsx      # User authentication state
│   └── assessment.jsx # Assessment data state
├── pages/            # Page components
│   ├── Admin/        # Admin dashboard pages
│   ├── Auth/         # Login pages
│   └── Main/         # Main user pages
└── utils/            # Utility functions
```

## Features

### User Authentication
- Email-based user login
- OTP (One-Time Password) verification
- Separate admin login portal
- Session persistence via localStorage

### Assessment Flow
- Welcome page with introductory video
- Multiple assessment sections
- Question-based evaluation
- Progress saving (auto-save)
- Section navigation

### Reporting
- Personalized assessment reports
- PDF export functionality
- Visual report sections

### Admin Dashboard
- User management (Create, Read, Update, Delete)
- Bulk user upload via CSV
- Assessment overview

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Navigate to the project directory:
   ```bash
   cd riseUpFront
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:
```bash
npm start
```
The app will open at [http://localhost:3000](http://localhost:3000)

### Production Build

Create an optimized production build:
```bash
npm run build
```
The build artifacts will be in the `build/` folder.

### Testing

Run the test suite:
```bash
npm test
```

## API Integration

The application connects to a backend API. The base URL is configured in `src/axios/axiosFunctions.js`:

- **Production**: `https://assessments.theriseupculture.com/api/`
- **Development**: `http://localhost:8080/api/`

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/login` | POST | User login |
| `/auth/loginAdmin` | POST | Admin login |
| `/auth/request-otp` | POST | Request OTP code |
| `/auth/verify-otp` | POST | Verify OTP code |
| `/assessment/` | GET | Get all assessments |
| `/submission/active/user/:userId/assessmet/:assessmentId` | GET | Get active submission |
| `/submission/:id` | PUT | Save submission progress |
| `/report/assessment/:assessmentId/user/:userId` | GET | Get user report |
| `/user/allUserAdmin` | GET | Get all users (admin) |
| `/user/` | POST | Create user |
| `/user/:id` | PUT | Update user |
| `/user/:id` | DELETE | Delete user |
| `/user/bulk-upload` | POST | Bulk upload users via CSV |

## Routing

### Public Routes (Unauthenticated)
- `/` - User login page
- `/admin` - Admin login page

### User Routes (Authenticated as user)
- `/` - Welcome page
- `/section/:id` - Assessment section
- `/report` - Assessment report

### Admin Routes (Authenticated as admin)
- `/` - Admin dashboard home
- `/users` - User management

## Context Providers

### UserContext
Manages the current user's authentication state.

```javascript
{
  currentUser: Object | null,
  setCurrentUser: Function
}
```

### AssessmentContext
Manages assessment data and provides utility functions.

```javascript
{
  currentAssessment: Object | null,
  setCurrentAssessment: Function,
  isLoading: Boolean,
  refetchAssessments: Function,
  getSectionById: Function,
  getNextSection: Function,
  getSectionInfo: Function
}
```

## Environment Configuration

To switch between development and production environments, update the `BASE_URL` and `FRONT_URL` constants in `src/axios/axiosFunctions.js`.

## Browser Support

- Chrome (last version)
- Firefox (last version)
- Safari (last version)

## License

Private - All rights reserved by The Rise Up Culture

## Contact

For questions or support, contact the development team at The Rise Up Culture.
