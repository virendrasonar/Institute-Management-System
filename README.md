🎓 Institute Management System

A full-stack web application for managing institute operations including courses, students, and messages. Built using modern enterprise technologies with clean architecture principles.

🏗 Architecture

Backend: Spring Boot 3 REST API

Frontend: Angular 17 (Standalone Components) + Angular Material

Database: H2 (Development)

Build Tools: Maven & npm

Container Support: Docker Compose

✨ Core Features
📊 Dashboard

Real-time system statistics

Module navigation

Dynamic data updates via REST APIs

📚 Course Management

Create, update, delete courses

Course listing

Form validation and backend integration

👨‍🎓 Student Management

Add, update, delete students

Status tracking (Active / Inactive)

Data-driven table with actions

📩 Message Management

View contact messages

Expandable message details

Admin-side message tracking

🌐 Public Contact Form

Allows visitors to send inquiries

Backend persistence

Validation handling

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
Prerequisites

Java 17+

Node.js 16+

npm

🔹 Quick Start

Run:

setup.bat
start-system.bat

Access:

Frontend → http://localhost:4200

Backend → http://localhost:8080

H2 Console → http://localhost:8080/h2-console

🔹 Manual Setup

Frontend

cd frontend
npm install
npm start

Backend

cd backend/backend
mvnw.cmd spring-boot:run
📡 API Endpoints
Courses

GET /admin/courses

POST /admin/courses

PUT /admin/courses/{id}

DELETE /admin/courses/{id}

Students

GET /admin/students

POST /admin/students

PUT /admin/students/{id}

DELETE /admin/students/{id}

Messages

GET /admin/messages

GET /admin/messages/{id}

📂 Project Structure
institute-management-system/
│
├── backend/        → Spring Boot REST API
├── frontend/       → Angular 17 Application
├── docker-compose.yml
└── documentation files
🎯 Development Highlights

Modular Angular standalone architecture

RESTful API design

Clean UI using Angular Material

Reactive Forms with validation

Separation of concerns (Controller → Service → Repository)

Consistent UI/UX across modules

📘 Documentation

PROJECT_DOCUMENTATION.md

DEPLOYMENT_GUIDE.md

TROUBLESHOOTING.md

📌 Status

Active development project demonstrating full-stack application architecture using Java and Angular.

⚠️ Important

After replacing README:

git add README.md
git commit -m "Refactor README and resolve merge conflict"
git push

If you want, I can also:

Make it more resume-focused

Add a professional project description paragraph for LinkedIn

Help you write 3 strong bullet points for interviews**

Tell me what you want next.

give me all in one i ahve to copy paste thats readme file

Here is your complete final README.md.
Just replace everything inside your current README file with this.

🎓 Institute Management System

A full-stack web application for managing institute operations including courses, students, and messages.
This project demonstrates real-world CRUD operations, RESTful API design, modular frontend architecture, and clean separation of concerns using Java and Angular technologies.

🏗 Architecture

Backend: Spring Boot 3 (REST API)

Frontend: Angular 17 (Standalone Components) with Angular Material

Database: H2 (Development)

Build Tools: Maven & npm

Container Support: Docker Compose

✨ Core Features
📊 Dashboard

Real-time system statistics

Centralized navigation to modules

Dynamic API-driven data display

📚 Course Management

Create, update, and delete courses

Structured course listing

Backend validation and error handling

👨‍🎓 Student Management

Add, update, delete students

Active / Inactive status handling

Clean data table with action controls

📩 Message Management

View messages submitted via contact form

Expandable message cards

Admin-side message tracking

🌐 Public Contact Form

Allows website visitors to send inquiries

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

Run:

setup.bat
start-system.bat

Then access:

Frontend → http://localhost:4200

Backend API → http://localhost:8080

H2 Console → http://localhost:8080/h2-console

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

GET /admin/courses

POST /admin/courses

GET /admin/courses/{id}

PUT /admin/courses/{id}

DELETE /admin/courses/{id}

Students

GET /admin/students

POST /admin/students

GET /admin/students/{id}

PUT /admin/students/{id}

DELETE /admin/students/{id}

Messages

GET /admin/messages

GET /admin/messages/{id}

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

Proper error handling and snackbar notifications

📘 Additional Documentation

PROJECT_DOCUMENTATION.md

DEPLOYMENT_GUIDE.md

TROUBLESHOOTING.md

🌐 Live Preview

🔗 : Click on the link, you can add, edit, delete, modify courses.
    You can add, delete, modify students.
    You can send messages to us.
👉 https://vsedutech.netlify.app

📌 Project Status

Completed full-stack implementation with CRUD operations for Courses, Students, and Messages.

This project demonstrates practical application development using Java Spring Boot and Angular.

👨‍💻 Author

Virendra Sonar
Full Stack Developer specializing in scalable web applications using Java, Spring Boot, RESTful APIs, and modern frontend technologies.
