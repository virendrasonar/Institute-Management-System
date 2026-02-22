🎓 Institute Management System
<p align="center"> <b>A full-stack web application for managing institute operations including courses, students, and messages.</b><br> Built using <b>Spring Boot</b> and <b>Angular</b> with clean architecture and RESTful design principles. </p>
🏗 Architecture
Layer	Technology
Backend	Spring Boot 3 (REST API)
Frontend	Angular 17 (Standalone Components) + Angular Material
Database	H2 (Development)
Build Tools	Maven & npm
Containerization	Docker Compose
✨ Core Features
📊 Dashboard

Real-time system statistics

Centralized module navigation

Dynamic API-driven data display

📚 Course Management

Create, update, delete courses

Structured course listing

Backend validation & error handling

👨‍🎓 Student Management

Add, update, delete students

Active / Inactive status handling

Clean data table with action controls

📩 Message Management

View messages submitted via contact form

Expandable message cards

Admin-side message tracking

🌐 Public Contact Form

Accept inquiries from website visitors

Data persistence through REST APIs

Validation and structured storage

🛠 Technology Stack
Backend

Java 17+

Spring Boot 3

Spring Data JPA

H2 Database

RESTful APIs

Maven

Frontend

Angular 17

Angular Material (MDC)

TypeScript

RxJS

Standalone Components

Lazy Loading

🚀 Getting Started
📌 Prerequisites

Java 17+

Node.js 16+

npm (comes with Node.js)

🔹 Quick Setup (Recommended)
setup.bat
start-system.bat

Then access:

🌐 Frontend → http://localhost:4200

🔧 Backend API → http://localhost:8080

🗄 H2 Console → http://localhost:8080/h2-console

🔹 Manual Setup
1️⃣ Install Frontend Dependencies
cd frontend
npm install
2️⃣ Start Backend
cd backend/backend
mvnw.cmd spring-boot:run
3️⃣ Start Frontend
cd frontend
npm start
📡 API Endpoints
Courses
GET     /admin/courses
POST    /admin/courses
GET     /admin/courses/{id}
PUT     /admin/courses/{id}
DELETE  /admin/courses/{id}
Students
GET     /admin/students
POST    /admin/students
GET     /admin/students/{id}
PUT     /admin/students/{id}
DELETE  /admin/students/{id}
Messages
GET     /admin/messages
GET     /admin/messages/{id}
📂 Project Structure
institute-management-system/
│
├── backend/               → Spring Boot REST API
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
│
├── frontend/              → Angular 17 Application
│   ├── components/
│   ├── services/
│   ├── models/
│   └── shared/
│
├── docker-compose.yml
└── documentation files
🎯 Development Highlights

Modular Angular standalone component architecture

RESTful API design following best practices

Layered backend structure (Controller → Service → Repository)

Reactive Forms with validation

Angular Material UI consistency

Clean and responsive interface

Structured error handling and snackbar notifications

📘 Additional Documentation

PROJECT_DOCUMENTATION.md

DEPLOYMENT_GUIDE.md

TROUBLESHOOTING.md

📌 Project Status

✅ Completed full-stack implementation with CRUD operations for Courses, Students, and Messages.

This project demonstrates practical full-stack application development using Java Spring Boot and Angular.

👨‍💻 Author

Virendra Sonar
Full Stack Developer specializing in scalable web applications using Java, Spring Boot, RESTful APIs, and modern frontend technologies.
