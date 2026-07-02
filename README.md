# 🎓 Institute Management System

A full-stack web application for managing institute operations through dedicated **student** and **admin** portals. Students can explore courses, enroll, access their dashboard, and track learning progress. Administrators can manage courses, students, enquiries, enrollments, and dashboard statistics from one centralized platform.

## 🌐 Live Demo

* **Backend API:** https://institute-management-system-production-ef72.up.railway.app
* **Frontend:** Add your Railway frontend URL here after deployment.

---

## 🏗 Architecture

* **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate
* **Frontend:** Angular 17, TypeScript, Angular Material
* **Database:** H2 for local development, PostgreSQL for production
* **Authentication:** Admin and student login with protected routes
* **Deployment:** Railway
* **Build Tools:** Maven and npm
* **Container Support:** Docker and Docker Compose

---

## ✨ Core Features

### 📚 Course Management

* Browse available courses
* View course details
* Add, edit, and delete courses
* Manage course information from the admin portal
* Validate forms on frontend and backend

### 👨‍🎓 Student Features

* Student registration and login
* Course enrollment
* Personalized student dashboard
* View enrolled courses
* Track learning progress
* Access course learning pages

### 🛠 Admin Portal

* Secure admin login
* Dashboard with system statistics
* Manage courses through CRUD operations
* Manage student records
* View and manage enrollments
* View student enquiries and contact messages
* Access reports and analytics

### 📩 Enquiry and Contact Management

* Public contact form for visitors
* Submit course-related enquiries
* Store messages in the backend database
* Admin-side message tracking and management

### 📊 Dashboard and Analytics

* Course, student, enquiry, and enrollment statistics
* Dynamic data loaded through REST APIs
* Centralized navigation for administrative modules

---

## 🛠 Technology Stack

### Backend

* Java 17
* Spring Boot 3
* Spring Data JPA
* Hibernate
* PostgreSQL
* H2 Database
* RESTful APIs
* Maven

### Frontend

* Angular 17
* TypeScript
* Angular Material
* RxJS
* Reactive Forms
* Standalone Components
* Lazy Loading
* HTML and CSS

---

## 📂 Project Structure

```text
Institute-Management-System/
│
├── backend/
│   └── backend/
│       ├── src/
│       │   ├── main/
│       │   │   ├── java/
│       │   │   │   └── com/institute/
│       │   │   │       ├── admin/
│       │   │   │       ├── config/
│       │   │   │       └── security/
│       │   │   └── resources/
│       │   │       ├── application.properties
│       │   │       ├── application-local.properties
│       │   │       └── application-prod.properties
│       ├── Dockerfile
│       └── pom.xml
│
├── frontend/
│   ├── src/
│   │   └── app/
│   │       ├── components/
│   │       ├── services/
│   │       ├── guards/
│   │       ├── models/
│   │       └── shared/
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

* Java 17+
* Node.js 16+
* npm
* Maven or Maven Wrapper
* PostgreSQL for production setup

---

## 🔹 Run Locally

### 1. Start the Backend

```bash
cd backend/backend
mvnw.cmd spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

---

### 2. Start the Frontend

Open another terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```text
http://localhost:4200
```

---

### 3. H2 Database Console

For local development, access the H2 console at:

```text
http://localhost:8080/h2-console
```

Use the database values from `application-local.properties`.

---

## 📡 Main API Endpoints

### Public APIs

```text
GET    /api/public/courses
GET    /api/public/courses/{id}
POST   /api/public/contact
POST   /api/public/enroll
GET    /api/public/learning/{accessToken}
```

### Admin Authentication

```text
POST   /api/admin/auth/login
POST   /api/admin/auth/logout
```

### Student Authentication

```text
POST   /api/student/auth/login
POST   /api/student/auth/logout
GET    /api/student/dashboard
```

### Admin Management APIs

```text
GET    /admin/courses
POST   /admin/courses
PUT    /admin/courses/{id}
DELETE /admin/courses/{id}

GET    /admin/students
POST   /admin/students
PUT    /admin/students/{id}
DELETE /admin/students/{id}

GET    /admin/messages
GET    /admin/messages/{id}

GET    /admin/enrollments
```

---

## 🔐 Roles and Access

### Student

Students can:

* Explore courses
* Enroll in courses
* Log in to their student dashboard
* View enrolled courses
* Track learning progress
* Access learning content

### Administrator

Administrators can:

* Log in securely
* Add, update, and delete courses
* Manage student records
* View enrollments
* Handle enquiries and messages
* Monitor dashboard statistics
* Access reports and administrative features

---

## 🌍 Production Deployment

The backend is configured for Railway with PostgreSQL.

Required backend environment variables:

```env
SPRING_PROFILES_ACTIVE=prod

SPRING_DATASOURCE_URL=jdbc:postgresql://postgres.railway.internal:5432/railway
SPRING_DATASOURCE_USERNAME=${{Postgres.PGUSER}}
SPRING_DATASOURCE_PASSWORD=${{Postgres.PGPASSWORD}}

ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Administrator
ADMIN_SESSION_HOURS=8
STUDENT_SESSION_HOURS=24
```

Backend Railway root directory:

```text
backend/backend
```

---

## 🎯 Development Highlights

* Full-stack architecture using Spring Boot and Angular
* Layered backend design: Controller → Service → Repository
* RESTful API development
* PostgreSQL production database integration
* H2 local development database
* Role-based access through admin and student guards
* Student enrollment and course-progress tracking
* Angular standalone component architecture
* Reactive forms and validation
* Responsive Angular Material interface
* Clean separation of frontend and backend responsibilities
* Docker support for containerized deployment

---

## 📌 Project Status

Active full-stack project demonstrating practical Java Spring Boot and Angular development.

The application currently supports:

* Course management
* Student management
* Course enrollment
* Student dashboard
* Course-progress tracking
* Admin dashboard
* Enquiry and message management
* PostgreSQL production deployment

---

## 👨‍💻 Author

**Virendra Sonar**
Full-Stack Java Developer

Focused on building secure and scalable web applications using Java, Spring Boot, RESTful APIs, PostgreSQL, Angular, TypeScript, HTML, and CSS.
