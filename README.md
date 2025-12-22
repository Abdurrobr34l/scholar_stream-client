# Scholar Stream

**Live URL :  https://scholarships-stream.netlify.app/all-scholarships** 

---

## Project Overview

**Scholar Stream** is a full-stack scholarship management platform designed to help students explore scholarships, apply for them, and track application status. It provides admins and moderators with tools to manage scholarships, applications, and student reviews efficiently. The platform integrates payment handling, authentication, and dynamic content rendering for a seamless user experience.

---

## Key Features

### General
- Responsive and modern UI built with **React**, **TailwindCSS**, and **DaisyUI**.
- Smooth animations and transitions using **Framer Motion**.
- User-friendly interface with clear navigation and structured pages.

### Authentication
- Email/password registration and login.
- Google social login integration.
- Role-based access: Student, Moderator, Admin.
- Password validation implemented on registration.

### Pages & Layout
- **Home Page:** Hero/banner section, top scholarships, and two extra static sections.
- **All Scholarships Page:** Responsive grid, search, and filter functionality.
- **Scholarship Details Page:** Full scholarship info, apply button, reviews section.
- **User Dashboard:** Manage applications, view personal information, and check payment status.
- **Payment Pages:** Payment success and payment cancelled pages.
- **Error Handling:** 404 page and forbidden page for restricted access.
- **Navbar & Footer:** Dynamic display based on login state.

### Scholarship Management
- Admin/Moderator can create, update, and delete scholarships.
- Application tracking with statuses: pending, completed, paid/unpaid.
- Review system for students to provide feedback and ratings.

---

## Data Design

**Collections:**
1. **Users Collection:** Stores user info including `name`, `email`, `photoURL`, and `role`.
2. **Scholarships Collection:** Stores scholarship data including `scholarshipName`, `universityName`, `degree`, `fees`, `deadlines`, and more.
3. **Applications Collection:** Stores user applications with `scholarshipId`, `userId`, `status`, `paymentStatus`, `feedback`, and other relevant info.
4. **Reviews Collection:** Stores student reviews with `ratingPoint`, `reviewComment`, and `reviewDate`.

---

## Technologies & Packages

### Frontend
- **React** (v19.2)
- **Vite** for development and build
- **TailwindCSS** & **DaisyUI** for styling
- **React Router** for routing
- **React Hook Form** for form handling
- **Axios** for API requests
- **Framer Motion** for animations
- **TanStack Query** for data fetching
- **React Toastify** for notifications
- **Recharts** for data visualization
- **SweetAlert2** for alerts

### Backend
- **Node.js** & **Express** for server
- **MongoDB** for database
- **Firebase Admin SDK** for authentication & role management
- **Stripe** for payment integration
- **Cors** & **Dotenv** for server configuration

---
