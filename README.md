# 🔗 DJ URL Shortener

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Spring%20Boot-3.x-6DB33F?style=for-the-badge&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Java-23-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" />
  <img src="https://img.shields.io/badge/Spring%20Security-JWT-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
  <img src="https://img.shields.io/badge/Netlify-Deployed-00C7B7?style=for-the-badge&logo=netlify&logoColor=white" />
</p>

<p align="center">
  <strong>A full-stack URL shortening platform built with React and Spring Boot.</strong>
</p>

<p align="center">
  Create short, shareable URLs, manage them from a dashboard, copy links instantly, track clicks, and view link analytics.
</p>

<p align="center">
  🚀 <strong>Live Demo:</strong>
  <a href="https://djurlshortener.netlify.app/">DJ URL Shortener</a>
</p>

---

## 📌 Table of Contents

* [🌐 Live Demo](#-live-demo)
* [📖 About the Project](#-about-the-project)
* [✨ Features](#-features)
* [🎯 Project Goals](#-project-goals)
* [🏗️ Architecture](#️-architecture)
* [🛠️ Tech Stack](#️-tech-stack)
* [📂 Project Structure](#-project-structure)
* [🔐 Authentication & Security](#-authentication--security)
* [🔗 URL Shortening Flow](#-url-shortening-flow)
* [📊 Analytics](#-analytics)
* [⚛️ Frontend](#️-frontend)
* [☕ Backend](#-backend)
* [🐳 Docker](#-docker)
* [🌍 Deployment](#-deployment)
* [⚙️ Environment Variables](#️-environment-variables)
* [🚀 Getting Started](#-getting-started)
* [💻 Running the Frontend](#-running-the-frontend)
* [☕ Running the Backend](#-running-the-backend)
* [🐳 Running with Docker](#-running-with-docker)
* [🔄 Application Flow](#-application-flow)
* [📡 API Overview](#-api-overview)
* [🧠 Technical Concepts](#-technical-concepts)
* [🛡️ Security Considerations](#️-security-considerations)
* [🎨 UI & User Experience](#-ui--user-experience)
* [📈 Future Improvements](#-future-improvements)
* [🐛 Troubleshooting](#-troubleshooting)
* [🤝 Contributing](#-contributing)
* [📄 License](#-license)
* [👨‍💻 Author](#-author)

---

# 🌐 Live Demo

## 🚀 Production Application

**Live URL:**

👉 https://djurlshortener.netlify.app/

The application is deployed and can be used to:

* Register a new account
* Login securely
* Create shortened URLs
* View previously created URLs
* Copy short URLs
* Open short URLs in a new tab
* Track clicks
* View analytics
* Manage links through the dashboard

> **Note:** The backend API is deployed separately from the React frontend.

---

# 📖 About the Project

DJ URL Shortener is a **full-stack URL shortening application** designed to provide a simple and efficient way to convert long URLs into short, shareable links.

The project combines a modern React frontend with a Spring Boot backend and implements authentication, authorization, URL management, click tracking, analytics, and deployment using Docker and Netlify.

Instead of simply generating a short URL, the application provides a complete link-management experience through an authenticated dashboard.

### Example

A long URL such as:

```text
https://music.youtube.com/watch?v=Usa7JHqUQiY&list=RDAMVMzWW75icDzCE
```

can be transformed into a short URL such as:

```text
https://djurlshortener.netlify.app/s/90MSah4G
```

The generated short URL can then be:

* copied to the clipboard
* opened in a new browser tab
* shared with other users
* tracked for click activity
* analyzed through the dashboard

---

# ✨ Features

## 🔐 Authentication

* User registration
* User login
* JWT-based authentication
* Protected dashboard routes
* Token persistence using browser local storage
* Authentication state managed using React Context
* Spring Security integration
* Password hashing using BCrypt

---

## 🔗 URL Shortening

Users can:

* Enter a long URL
* Generate a unique short URL
* Copy the generated URL
* Open the generated URL in a new tab
* Redirect users from the short URL to the original URL

Example:

```text
Original URL
     ↓
https://example.com/very/long/url
     ↓
Shortener
     ↓
90MSah4G
     ↓
https://djurlshortener.netlify.app/s/90MSah4G
```

---

## 📊 Dashboard

The authenticated dashboard provides:

* Total click analytics
* List of previously generated URLs
* Original URL display
* Short URL display
* Click count
* Creation date
* Copy button
* Analytics button
* Create new short URL popup

---

## 📈 Link Analytics

Each shortened URL can display analytics information.

The application retrieves click information from the backend and converts the response into a format suitable for visualization.

Example backend data:

```json
{
  "2026-08-30": 5,
  "2026-08-31": 12,
  "2026-09-01": 8
}
```

The frontend transforms this into:

```javascript
[
  {
    clickDate: "2026-08-30",
    count: 5
  },
  {
    clickDate: "2026-08-31",
    count: 12
  },
  {
    clickDate: "2026-09-01",
    count: 8
  }
]
```

This data is then passed to the graph component for visualization.

---

# 🎯 Project Goals

The primary goals of this project were to build a production-style full-stack application while learning and implementing:

* REST API development
* Authentication and authorization
* JWT security
* React state management
* React Router
* Server-state management
* API integration
* URL redirection
* Database-backed persistence
* Analytics
* Docker containerization
* Frontend deployment
* Backend deployment
* Production environment configuration
* CORS configuration

---

# 🏗️ Architecture

The application follows a client-server architecture.

```text
                    ┌──────────────────────────┐
                    │        User / Browser    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │     React Frontend       │
                    │                          │
                    │  React Router            │
                    │  Context API             │
                    │  TanStack Query          │
                    │  Axios                   │
                    │  Tailwind CSS            │
                    └────────────┬─────────────┘
                                 │
                                 │ REST API
                                 ▼
                    ┌──────────────────────────┐
                    │    Spring Boot Backend   │
                    │                          │
                    │  Spring Security         │
                    │  JWT Authentication      │
                    │  REST Controllers        │
                    │  Service Layer           │
                    │  JPA / Hibernate         │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │        Database          │
                    └──────────────────────────┘
```

---

# 🛠️ Tech Stack

## Frontend

| Technology      | Purpose                              |
| --------------- | ------------------------------------ |
| React           | User interface                       |
| React Router    | Client-side routing                  |
| Tailwind CSS    | Styling and responsive UI            |
| Axios           | HTTP requests                        |
| TanStack Query  | Server-state and API data management |
| React Hook Form | Form handling                        |
| React Hot Toast | Notifications                        |
| Framer Motion   | UI animations                        |
| React Icons     | Icons                                |
| Vite            | Frontend development/build tool      |

---

## Backend

| Technology      | Purpose                          |
| --------------- | -------------------------------- |
| Java            | Backend programming language     |
| Spring Boot     | Backend framework                |
| Spring Web      | REST APIs                        |
| Spring Security | Authentication and authorization |
| JWT             | Stateless authentication         |
| Spring Data JPA | Database access                  |
| Hibernate       | ORM                              |
| BCrypt          | Password hashing                 |
| Maven           | Dependency management/build      |

---

## DevOps & Deployment

| Technology | Purpose                  |
| ---------- | ------------------------ |
| Docker     | Backend containerization |
| Netlify    | Frontend deployment      |
| Git        | Version control          |
| GitHub     | Source code hosting      |

---

# 📂 Project Structure

The project is separated into frontend and backend applications.

## Frontend

```text
url-shortener-react/
│
├── public/
│   ├── images/
│   └── _redirects
│
├── src/
│   │
│   ├── api/
│   │   └── api.js
│   │
│   ├── components/
│   │   ├── Dashboard/
│   │   │   ├── DashboardLayout.jsx
│   │   │   ├── Graph.jsx
│   │   │   ├── ShortenItem.jsx
│   │   │   ├── ShortenUrlList.jsx
│   │   │   └── ShortenPopUp.jsx
│   │   │
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ShortenUrlPage.jsx
│   │
│   ├── ContextApi/
│   │   └── ContextApi.jsx
│   │
│   ├── hooks/
│   │   └── useQuery.js
│   │
│   ├── App.jsx
│   ├── AppRouter.jsx
│   ├── PrivateRoute.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

---

## Backend

The Spring Boot backend follows a layered architecture containing components for:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

Security-related functionality is separated into dedicated security classes.

Example:

```text
src/main/java/com/url/shortener/

├── controller/
│
├── service/
│
├── repository/
│
├── model/
│
├── security/
│   ├── WebConfig.java
│   ├── WebSecurityConfig.java
│   └── jwt/
│       ├── JwtAuthenticationFilter.java
│       └── JwtUtils.java
│
└── ...
```

---

# 🔐 Authentication & Security

The application uses **JWT authentication** with Spring Security.

## Authentication Flow

```text
User
 ↓
Login Form
 ↓
POST /api/auth/public/login
 ↓
Spring Security
 ↓
User Authentication
 ↓
JWT Generated
 ↓
React receives JWT
 ↓
JWT stored in browser storage
 ↓
JWT included in protected API requests
```

Protected requests use:

```http
Authorization: Bearer <JWT>
```

---

## JWT Request Flow

When the frontend calls a protected API:

```text
React
 ↓
Axios
 ↓
Authorization: Bearer JWT
 ↓
Spring Security
 ↓
JwtAuthenticationFilter
 ↓
JWT Validation
 ↓
User Details
 ↓
SecurityContext
 ↓
Controller
```

This allows the backend to authenticate the user without maintaining a traditional server-side session.

---

# 🔗 URL Shortening Flow

When a user creates a URL:

```text
User enters:
https://example.com/some/very/long/url
                    ↓
            Create Short URL
                    ↓
             React Popup
                    ↓
             Axios Request
                    ↓
        Spring Boot REST API
                    ↓
           URL Generation
                    ↓
             Database
                    ↓
        Short URL returned
                    ↓
             Dashboard
```

Example:

```text
Long URL
https://music.youtube.com/watch?v=...

          ↓

Short URL
90MSah4G

          ↓

Public URL
https://djurlshortener.netlify.app/s/90MSah4G
```

---

# 🔄 Short URL Redirection

The public short URL uses the React route:

```text
/s/:url
```

For example:

```text
https://djurlshortener.netlify.app/s/90MSah4G
```

React Router extracts:

```text
url = 90MSah4G
```

The redirect page then sends the request to the backend:

```text
https://your-backend-url/90MSah4G
```

The backend resolves the short code and redirects the user to the original URL.

### Complete flow

```text
User clicks short URL
        ↓
Netlify
        ↓
React Router
        ↓
/s/90MSah4G
        ↓
ShortenUrlPage
        ↓
Backend
        ↓
/90MSah4G
        ↓
Find short URL
        ↓
Record click
        ↓
Redirect
        ↓
Original URL
```

---

# 📊 Analytics

The application tracks clicks for shortened URLs.

The dashboard retrieves aggregate click information from the backend.

Example:

```text
Date              Clicks
─────────────────────────
Aug 30             5
Aug 31            12
Sep 01             8
```

The frontend transforms the API response into chart-friendly objects and passes them to the graph component.

This allows users to understand how their shortened links are being used over time.

---

# ⚛️ Frontend

The frontend is built with React and Vite.

## React Router

The application uses routes for:

```text
/
```

Landing page.

```text
/about
```

About page.

```text
/login
```

Login page.

```text
/register
```

Registration page.

```text
/dashboard
```

Authenticated dashboard.

```text
/s/:url
```

Short URL redirect route.

---

# 🛡️ Protected Routes

The dashboard is protected using a `PrivateRoute`.

Conceptually:

```text
User
 ↓
/dashboard
 ↓
Is JWT available?
 ↓
 ┌───────────────┐
 │               │
 YES             NO
 │               │
 ↓               ↓
Dashboard       Login
```

This prevents unauthenticated users from directly accessing the dashboard.

---

# ⚛️ React Context API

Authentication state is shared across the application using React Context.

The context provides:

```javascript
{
  token,
  setToken
}
```

This allows components such as:

* Landing Page
* Dashboard
* Login
* Short URL components

to access authentication state without manually passing the token through every component.

---

# 🔄 TanStack Query

The frontend uses TanStack Query for server-state management.

It handles operations such as:

* Fetching user's short URLs
* Fetching total click data
* Creating short URLs
* Refetching URL data after creation
* Loading states
* Error states
* Cached server data

Example conceptual flow:

```text
Component
   ↓
useQuery / useMutation
   ↓
Axios
   ↓
Spring Boot API
   ↓
Response
   ↓
React UI
```

---

# 📡 Axios API Layer

API communication is centralized through an Axios instance.

Example configuration:

```javascript
import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
});
```

This allows the frontend to use the same API configuration across development and production environments.

---

# 🎨 UI & User Experience

The frontend focuses on a clean, responsive interface.

The application includes:

* Responsive layouts
* Dashboard cards
* Interactive buttons
* Toast notifications
* Loading states
* Error states
* Modal popup for creating URLs
* Animated landing page elements
* Copy-to-clipboard functionality
* Analytics visualization
* External-link indicators

---

# 📱 Responsive Design

The UI is designed to work across:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive utilities are used throughout the application.

Examples include:

```text
sm:
md:
lg:
xl:
```

---

# 📋 Copy Short URL

The dashboard provides a dedicated copy button.

When clicked:

```text
Short URL
    ↓
Clipboard API
    ↓
Browser Clipboard
```

The user receives a toast notification confirming that the URL has been copied.

---

# 🐳 Docker

The Spring Boot backend is containerized using Docker.

The Docker setup uses a multi-stage build.

### Build stage

```text
Maven + Java
      ↓
Download dependencies
      ↓
Compile source code
      ↓
Build JAR
```

### Runtime stage

```text
Java Runtime
      ↓
Copy generated JAR
      ↓
Run Spring Boot
```

This keeps the build process separate from the runtime environment.

---

# 🐳 Docker Build

Build the backend image:

```bash
docker build -t url-shortener-backend .
```

Run the container:

```bash
docker run -p 8080:8080 url-shortener-backend
```

The backend will then be available at:

```text
http://localhost:8080
```

---

# 🌍 Deployment

## Frontend

The React frontend is deployed on:

### Netlify

🚀 **Live Application**

https://djurlshortener.netlify.app/

---

## Backend

The Spring Boot backend is containerized using Docker and can be deployed to a cloud container/server environment.

The frontend communicates with the deployed backend using:

```text
VITE_BACKEND_URL
```

---

# ⚙️ Environment Variables

## Frontend

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:8080
```

For production, configure the corresponding production backend URL in your hosting platform.

For example:

```env
VITE_BACKEND_URL=https://your-production-backend-url
```

> Never commit sensitive credentials or secrets to GitHub.

---

## Backend

Production database credentials and authentication secrets should be provided through environment variables rather than hard-coded into the repository.

Example:

```properties
DATABASE_URL=${DATABASE_URL}
DATABASE_USERNAME=${DATABASE_USERNAME}
DATABASE_PASSWORD=${DATABASE_PASSWORD}
JWT_SECRET=${JWT_SECRET}
```

---

# 🚀 Getting Started

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* Java
* Maven
* Git
* Docker (optional)

---

# 💻 Frontend Setup

Clone the repository:

```bash
git clone <your-github-repository-url>
```

Navigate to the frontend:

```bash
cd url-shortener-react
```

Install dependencies:

```bash
npm install
```

Create `.env`:

```env
VITE_BACKEND_URL=http://localhost:8080
```

Start the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

# ☕ Backend Setup

Navigate to the Spring Boot project:

```bash
cd url-shortener-sb
```

Build the project:

```bash
./mvnw clean package -DskipTests
```

On Windows:

```bash
mvnw.cmd clean package -DskipTests
```

Run the application:

```bash
./mvnw spring-boot:run
```

The backend will run on:

```text
http://localhost:8080
```

---

# 🐳 Running with Docker

Build:

```bash
docker build -t url-shortener-backend .
```

Run:

```bash
docker run -p 8080:8080 url-shortener-backend
```

Check running containers:

```bash
docker ps
```

Stop the container:

```bash
docker stop <container-id>
```

---

# 🔄 Application Flow

The overall application works like this:

```text
                    USER
                     │
                     ▼
              ┌─────────────┐
              │   Landing   │
              │    Page     │
              └──────┬──────┘
                     │
             Login / Register
                     │
                     ▼
              ┌─────────────┐
              │     JWT     │
              │ Authentication
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │  Dashboard  │
              └──────┬──────┘
                     │
          ┌──────────┴──────────┐
          │                     │
          ▼                     ▼
    Create Short URL       View Analytics
          │                     │
          ▼                     ▼
       Backend               Backend
          │                     │
          ▼                     ▼
      Database              Click Data
          │                     │
          └──────────┬──────────┘
                     │
                     ▼
               Dashboard UI
```

---

# 📡 API Overview

The frontend communicates with the Spring Boot backend through REST endpoints.

## Authentication

### Login

```http
POST /api/auth/public/login
```

### Registration

```http
POST /api/auth/public/register
```

---

## URL Management

### Create Short URL

```http
POST /api/urls/shorten
```

### Get User's Short URLs

```http
GET /api/urls/myurls
```

### Get Total Clicks

```http
GET /api/urls/totalClicks
```

### Get Analytics

```http
GET /api/urls/analytics/{shortUrl}
```

### Redirect

```http
GET /{shortUrl}
```

> Exact endpoint availability and request/response formats depend on the backend implementation.

---

# 🧠 Technical Concepts Demonstrated

This project demonstrates practical implementation of several software engineering concepts.

## Frontend

* Component-based architecture
* React hooks
* State management
* Context API
* Client-side routing
* Protected routes
* Form validation
* API integration
* Server-state management
* Async operations
* Loading/error handling
* Responsive design
* Clipboard API
* Environment configuration

---

## Backend

* REST API design
* Layered architecture
* Dependency injection
* Spring Boot
* Spring Security
* JWT authentication
* Authorization
* Password hashing
* JPA/Hibernate
* Database persistence
* CORS
* Exception/error handling

---

## DevOps

* Docker
* Multi-stage Docker builds
* Environment configuration
* Frontend deployment
* Backend containerization
* Production configuration

---

# 🛡️ Security Considerations

The project uses several security mechanisms:

### JWT Authentication

Protected APIs require:

```http
Authorization: Bearer <token>
```

### Password Hashing

Passwords are not stored as plain text.

BCrypt is used for password encoding.

### Protected Dashboard

Unauthenticated users are redirected away from protected dashboard routes.

### CORS

The backend is configured to allow requests from the frontend application.

### Environment Variables

Production secrets should be supplied through environment variables instead of being committed to the repository.

---

# 🧪 Error Handling

The application includes frontend handling for common states:

```text
Loading
   ↓
Success
   ↓
Display Data
```

or:

```text
Loading
   ↓
API Error
   ↓
Display Error
```

Toast notifications are used to provide immediate feedback for actions such as:

* Successful login
* Failed login
* URL creation
* Copying a short URL
* Analytics errors

---

# 🎨 User Experience

The application provides dedicated UI states for:

### Empty Dashboard

```text
You haven't created any short link yet
```

### Loading

```text
Loading Dashboard...
```

### Analytics Empty State

```text
No Data For This Time Period
```

### URL Creation

A modal popup allows users to create a new shortened URL without leaving the dashboard.

---

# 📈 Future Improvements

The current application provides the core functionality of a URL-shortening platform. Possible future improvements include:

### 🔥 Advanced Analytics

* Geographic analytics
* Device analytics
* Browser analytics
* Referrer tracking
* Hourly click analysis
* Country-level visualization

### 🔐 Advanced Security

* Refresh tokens
* Token rotation
* Rate limiting
* API request throttling
* Account verification
* Password reset
* Email verification

### 🔗 URL Management

* Delete shortened URLs
* Edit links
* Custom aliases
* Expiration dates
* QR code generation
* Bulk URL creation

### 📊 Dashboard

* More advanced charts
* Date-range filters
* Click comparison
* Most popular links
* Recent activity
* Export analytics

### 🚀 Infrastructure

Potential future improvements include:

* CI/CD pipeline
* Automated tests
* Container orchestration
* Centralized logging
* Monitoring
* Health checks
* Database migration tooling
* Production caching

---

# 🐛 Troubleshooting

## Frontend cannot connect to backend

Check:

```env
VITE_BACKEND_URL=http://localhost:8080
```

for local development.

For production, make sure the Netlify environment variable points to the deployed backend.

---

## Short URL returns a Netlify 404

Because React Router handles client-side routes, the Netlify deployment needs a SPA rewrite.

The project includes:

```text
public/_redirects
```

containing:

```text
/* /index.html 200
```

This allows routes such as:

```text
/s/90MSah4G
```

to be handled by React Router.

---

## Docker build fails

Check the Java version configured in:

```xml
<java.version>...</java.version>
```

and make sure the Docker build environment supports that Java version.

Also verify that Maven is available in the Docker build image.

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

### 1. Fork the repository

```bash
git clone https://github.com/Dhruv-AFK/Url-Shortener
```

### 2. Create a branch

```bash
git checkout -b feature/your-feature
```

### 3. Make your changes

Implement and test your changes locally.

### 4. Commit

```bash
git add .
git commit -m "feat: add your feature"
```

### 5. Push

```bash
git push origin feature/your-feature
```

### 6. Open a Pull Request

Explain:

* What changed
* Why it was changed
* How it was tested

---

# 📄 License

This project is available for educational and portfolio purposes.

If you add a formal open-source license to the repository, update this section accordingly.

---

# 👨‍💻 Author

## Dhruv

Full-stack developer focused on building practical applications using modern frontend, backend, and deployment technologies.

### Project

🔗 **DJ URL Shortener**

### Live Demo

🚀 https://djurlshortener.netlify.app/

---

# ⭐ If You Like This Project

If you found this project useful or interesting:

* ⭐ Star the repository
* 🍴 Fork the project
* 🐛 Report issues
* 💡 Suggest improvements
* 🔧 Submit a pull request

---

<p align="center">
  <strong>Built with React + Spring Boot + Spring Security + JWT + Docker</strong>
</p>

<p align="center">
  🚀 <a href="https://djurlshortener.netlify.app/">Try the Live Application</a>
</p>
