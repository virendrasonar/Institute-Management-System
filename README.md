# Institute Management System

<!-- Replace this placeholder with a repository banner or product screenshot. -->
![Institute Management System Banner](./ui-blue-purple-desktop.png)

![Java](https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)
![Angular Admin](https://img.shields.io/badge/Admin%20UI-Angular%2017-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Angular Public Site](https://img.shields.io/badge/Public%20Site-Angular%2020-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-Admin%205.2%20%7C%20Public%205.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-Local-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Production-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Backend%20%2B%20Public%20Site-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Railway](https://img.shields.io/badge/Deployed%20on-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white)

An institute operations platform built with Spring Boot, Angular, JPA, and relational databases to manage public course discovery, student enrollment, learning access, admin course operations, student records, enquiries, and enrollment progress through separate public, student, and admin application surfaces.

## Live Demo

| Service | URL |
|---|---|
| Frontend | [https://lovely-art-production.up.railway.app](https://lovely-art-production.up.railway.app) |
| Backend API | [https://institute-management-system-production-ef72.up.railway.app](https://institute-management-system-production-ef72.up.railway.app) |
| Health Check | [Backend Health Endpoint](https://institute-management-system-production-ef72.up.railway.app/api/public/health) |

> **Note**
> Demo credentials are intended for local review only. Production admin credentials should always be supplied through environment variables.

## ⭐ Key Features

- Secure admin and student portals with expiring bearer-token sessions.
- Course, student, message, and enrollment management.
- 28 REST API handler methods across public, admin, and student flows.
- Responsive Angular 17 admin/student dashboard with route guards.
- Separate Angular 20 public website with API caching, retries, and health checks.
- Spring Data JPA persistence with MySQL locally and PostgreSQL in production.
- Dockerized backend and public website deployment support.
- Railway deployment configuration with environment-based backend profiles.

## Project Highlights

| Area | Implementation Detail |
|---|---|
| API surface | 28 mapped REST handler methods across 4 Spring controllers. |
| Backend architecture | Layered Controller -> Service -> Repository structure with 4 repositories and 5 Spring service classes. |
| Domain model | 4 JPA entities mapped to relational tables: courses, students, enrollments, and messages. |
| Admin dashboard | 19 Angular 17 component files, 7 services, guarded routes, interceptor-backed admin requests, and reactive forms. |
| Public website | 20 Angular 20 component files and 17 services for public pages, caching, health checks, SEO, monitoring, and UI behavior. |
| Persistence | MySQL local profile and PostgreSQL production profile using Spring Data JPA and Hibernate. |
| Deployment | Railway URLs, Spring production profile, backend Dockerfile, public website Dockerfile, and compose templates. |
| Testing | 10 backend test classes covering services, JPA entities, URL parsing, password hashing, and controller integration. |

## Project Statistics

| Metric | Current Repository |
|---|---:|
| REST API handler methods | 28 |
| Spring controllers | 4 |
| Spring service classes | 5 |
| JPA repositories | 4 |
| JPA entities / database tables | 4 |
| DTO classes / records | 6 |
| Admin dashboard component files | 19 |
| Admin dashboard service files | 7 |
| Public website component files | 20 |
| Public website service files | 17 |
| Backend test classes | 10 |
| Business modules | Courses, Students, Enrollments, Messages, Auth, Reports, Public Website |

## Screenshots

| Dashboard | Admin Login |
|---|---|
| ![Dashboard](docs/screenshots/dashboard.png) | ![Admin Login](docs/screenshots/admin-login.png) |

| Student Dashboard | Course Management |
|---|---|
| ![Student Dashboard](docs/screenshots/student-dashboard.png) | ![Course Management](docs/screenshots/course-management.png) |

| Enrollment | Reports |
|---|---|
| ![Enrollment](docs/screenshots/enrollment.png) | ![Reports](docs/screenshots/reports.png) |

## Architecture Diagram

```mermaid
flowchart LR
    Visitor["Visitor"] --> PublicSite["Angular 20 Public Website"]
    Student["Student"] --> AdminUI["Angular 17 Student/Admin UI"]
    Admin["Admin"] --> AdminUI

    PublicSite --> PublicApiClient["API Service with Cache + Retry"]
    AdminUI --> Guards["Route Guards + Admin Interceptor"]

    PublicApiClient --> API["Spring Boot REST API"]
    Guards --> API

    API --> PublicController["PublicController"]
    API --> AdminController["AdminController"]
    API --> StudentAuthController["StudentAuthController"]
    API --> AdminAuthController["AdminAuthController"]

    PublicController --> Services["Service Layer"]
    AdminController --> Services
    StudentAuthController --> Services
    AdminAuthController --> Services

    Services --> Repositories["Spring Data JPA Repositories"]
    Repositories --> DB[("MySQL Local / PostgreSQL Production")]

    API --> Filter["AdminAuthFilter"]
    Services --> Passwords["PBKDF2 PasswordService"]
    Services --> DTOs["DTO Responses"]
    PublicSite --> Nginx["Nginx Static Hosting"]
```

## Application Workflow

```mermaid
flowchart TD
    User["User / Student / Admin"]
    Angular["Angular Frontend"]
    API["Spring Boot REST APIs"]
    Service["Service Layer"]
    Repository["Repository Layer"]
    PostgreSQL[("PostgreSQL")]

    User --> Angular
    Angular --> API
    API --> Service
    Service --> Repository
    Repository --> PostgreSQL
```

## Features

### Admin

- Login and logout through admin credentials supplied by environment configuration.
- Protected admin routes and backend endpoints.
- Create, read, update, and delete courses.
- View, create, update, and delete student records.
- View and delete public contact messages.
- Review enrollment summaries ordered by most recent enrollment.
- Access dashboard and reports screens in the Angular admin application.

### Student

- Course enrollment with name, email, and password.
- Student login with expiring access token.
- Student dashboard showing enrolled courses.
- Learning page access through enrollment access tokens.
- Progress tracking from 0 to 100 percent with completion timestamp support.

### Public Website

- Course catalog with course details, pricing, level, instructor, thumbnail, materials, and learning media metadata.
- Contact form that stores enquiries for admin review.
- Routes for home, courses, course details, about, contact, API integration testing, and 404 handling.
- API client with request timeouts, retries, short-term caching, and periodic health checks.

### System

- MySQL-backed local profile and PostgreSQL-backed production profile.
- CORS configuration for local development and deployed frontend URLs.
- Backend data initializer for sample course, student, and message records.
- Public health endpoint for deployment checks.

<details>
<summary><strong>Business Modules</strong></summary>

| Module | Responsibility |
|---|---|
| Course Management | Maintains the institute course catalog and learning metadata. |
| Student Management | Stores student profiles, status, and password hash references. |
| Enrollment Management | Links students to courses, creates access tokens, and tracks progress. |
| Message Management | Captures contact form enquiries for admin review. |
| Authentication | Handles admin and student login sessions separately. |
| Reporting UI | Provides admin-facing reporting and dashboard navigation. |

</details>

## Engineering Highlights

| Practice | How It Appears in the Codebase |
|---|---|
| Layered Architecture | REST controllers delegate business rules to services, while repositories own persistence. |
| Separation of Concerns | Angular components handle view behavior; services own HTTP communication; guards protect routes. |
| REST API Design | Resource-oriented routes for courses, students, messages, enrollments, auth, learning access, and health. |
| Spring Boot | Used for dependency injection, embedded server runtime, profile-based configuration, REST controllers, and production packaging. |
| Spring Data JPA | Removes boilerplate persistence code while keeping repository methods expressive and testable. |
| Hibernate | Maps `Course`, `Student`, `Enrollment`, and `Message` objects to relational tables with constraints and relationships. |
| Validation | Backend services validate required fields, email format, password length, media type, and progress range; Angular reactive forms add client-side validation. |
| Error Handling | Controllers return explicit HTTP status codes through `ResponseEntity`; Angular centralizes client error handling in `ErrorHandlerService`. |
| Clean Code | Business behavior is grouped into focused services such as `EnrollmentService`, `PasswordService`, `AdminAuthService`, and `StudentAuthService`. |
| Responsive Angular UI | Angular Material, SCSS, standalone components, and lazy routes support a dashboard-style admin experience. |
| Environment Configuration | Local and production profiles separate database URLs, credentials, ports, admin sessions, and student sessions. |
| Public Website Delivery | The public website includes an Nginx Docker image, service-worker configuration, runtime environment template, and Lighthouse scripts. |
| Docker | Backend and public website have multi-stage Dockerfiles; compose files define local/staging/production service wiring. |
| Production Deployment | Railway-ready production profile connects to PostgreSQL through environment variables. |

### Software Engineering Principles

- **SOLID:** Services are split by responsibility instead of one all-purpose application class.
- **MVC:** Controllers expose HTTP boundaries, models represent domain data, and Angular components handle views.
- **Repository Pattern:** JPA repositories isolate database access from controllers and UI concerns.
- **Dependency Injection:** Spring injects services, repositories, config values, and filters through constructors.

## Technology Stack

| Technology | Why It Was Chosen |
|---|---|
| Java 17 | Stable long-term Java runtime with strong typing, mature tooling, and broad backend hiring relevance. |
| Spring Boot 3.5 | Used for fast backend development, dependency injection, REST APIs, profiles, and deployable application packaging. |
| Spring Data JPA | Keeps data access readable through repository interfaces while still supporting custom finder methods. |
| Hibernate | Handles object-relational mapping, lazy relationships, table constraints, and schema updates during development. |
| Angular 17 | Used for the admin/student dashboard because structured routing, TypeScript, reactive forms, services, guards, and reusable components fit operational screens well. |
| Angular 20 | Used in the public website, with standalone page routes, service-worker configuration, and separate environment files for local, staging, and production builds. |
| Angular Material | Provides production-style UI controls for forms, navigation, tables, and dashboard screens. |
| Nginx | Serves the public website container, handles Angular routing, adds cache headers, and proxies `/api/` requests when deployed with the backend service. |
| Lighthouse performance tooling | Included in the public website package scripts to audit page performance after production builds. |
| MySQL | Local relational database for day-to-day development through the `local` Spring profile. |
| PostgreSQL | Production database target for Railway deployment. |
| Maven | Standard Java build lifecycle for compiling, testing, and packaging the backend. |
| Docker | Packages the backend in a repeatable Java 17 container and supports service orchestration through Compose. |
| Railway | Hosts the deployed backend and frontend URLs referenced above. |

## Project Structure

```text
Institute-Management-System-main/
|-- backend/
|   `-- backend/
|       |-- Dockerfile
|       |-- pom.xml
|       `-- src/
|           |-- main/
|           |   |-- java/com/institute/
|           |   |   |-- InstituteBackendApplication.java
|           |   |   |-- admin/
|           |   |   |   |-- controller/
|           |   |   |   |-- dto/
|           |   |   |   |-- model/
|           |   |   |   |-- repository/
|           |   |   |   `-- services/
|           |   |   `-- config/
|           |   `-- resources/
|           |       |-- application.properties
|           |       |-- application-local.properties
|           |       `-- application-prod.properties
|           `-- test/java/com/institute/
|-- frontend/
|   |-- angular.json
|   |-- package.json
|   `-- src/app/
|       |-- components/
|       |-- guards/
|       |-- models/
|       |-- services/
|       `-- app.routes.ts
|-- public-website/
|   |-- Dockerfile
|   |-- nginx.conf
|   `-- src/
|-- docker-compose.yml
|-- docker-compose.production.yml
`-- README.md
```

## REST API Overview

### Public APIs

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/api/public/courses` | List public course catalog. |
| `GET` | `/api/public/courses/{id}` | Fetch course details. |
| `POST` | `/api/public/courses/{id}/enroll` | Enroll a student in a course. |
| `GET` | `/api/public/learning/{accessToken}` | Open enrolled learning content. |
| `PUT` | `/api/public/learning/{accessToken}/progress` | Update course progress. |
| `POST` | `/api/public/contact` | Submit a public enquiry. |
| `GET` | `/api/public/institute-info` | Return institute profile information. |
| `GET` | `/api/public/health` | Deployment health check. |

### Authentication APIs

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/admin/auth/login` | Admin login. |
| `POST` | `/admin/auth/logout` | Admin logout. |
| `POST` | `/api/student/auth/login` | Student login. |
| `POST` | `/api/student/auth/logout` | Student logout. |
| `GET` | `/api/student/dashboard` | Student dashboard for authenticated students. |

### Admin APIs

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/admin/courses` | List courses. |
| `POST` | `/admin/courses` | Create course. |
| `GET` | `/admin/courses/{id}` | Fetch one course. |
| `PUT` | `/admin/courses/{id}` | Update course. |
| `DELETE` | `/admin/courses/{id}` | Delete course. |
| `GET` | `/admin/students` | List students. |
| `POST` | `/admin/students` | Create student. |
| `GET` | `/admin/students/{id}` | Fetch one student. |
| `PUT` | `/admin/students/{id}` | Update student. |
| `DELETE` | `/admin/students/{id}` | Delete student. |
| `GET` | `/admin/messages` | List messages. |
| `POST` | `/admin/messages` | Create message. |
| `GET` | `/admin/messages/{id}` | Fetch one message. |
| `DELETE` | `/admin/messages/{id}` | Delete message. |
| `GET` | `/admin/enrollments` | List enrollment summaries. |

<details>
<summary><strong>Example Enrollment Request</strong></summary>

```http
POST /api/public/courses/1/enroll
Content-Type: application/json

{
  "name": "Aarav Sharma",
  "email": "aarav@example.com",
  "password": "Student@123"
}
```

</details>

## Database Design

```mermaid
erDiagram
    COURSES ||--o{ ENROLLMENTS : has
    STUDENTS ||--o{ ENROLLMENTS : creates

    COURSES {
        bigint id PK
        string name
        text description
        string duration
        string level
        string category
        decimal price
        string instructor
        double rating
        int students_enrolled
        string video_type
        string video_id
        text materials
    }

    STUDENTS {
        bigint id PK
        string name
        string email UK
        string status
        string password_hash
    }

    ENROLLMENTS {
        bigint id PK
        bigint course_id FK
        bigint student_id FK
        string access_token UK
        instant enrolled_at
        int progress_percent
        instant completed_at
    }

    MESSAGES {
        bigint id PK
        string sender_name
        string email
        text content
    }
```

| Table | Design Detail |
|---|---|
| `courses` | Stores catalog content, pricing, instructor data, media metadata, and learning materials. |
| `students` | Enforces unique student emails and hides password hashes from JSON responses. |
| `enrollments` | Uses a unique `(course_id, student_id)` constraint to prevent duplicate enrollments. |
| `messages` | Stores public contact submissions for admin follow-up. |

## Security Features

- Admin endpoints under `/admin/**` are protected by `AdminAuthFilter` when `app.admin.auth.enabled=true`.
- Admin login uses environment-configured credentials and expiring bearer tokens.
- Student login uses email/password validation and expiring bearer tokens.
- Student passwords are hashed with PBKDF2 using salt and 120,000 iterations.
- Password hashes are excluded from API serialization with `@JsonIgnore`.
- Learning pages use unique enrollment access tokens.
- CORS is restricted to local development origins and deployed frontend URLs.
- Production credentials are read from environment variables, not hardcoded into the production profile.

## Deployment Details

| Concern | Configuration |
|---|---|
| Backend host | Railway |
| Frontend host | Railway |
| Production database | PostgreSQL |
| Local database | MySQL |
| Backend profile | `prod` for production, `local` by default |
| API base URL | Configured in Angular environment files |

### Production Environment Variables

```env
SPRING_PROFILES_ACTIVE=prod
SPRING_DATASOURCE_URL=jdbc:postgresql://<host>:<port>/<database>
SPRING_DATASOURCE_USERNAME=<username>
SPRING_DATASOURCE_PASSWORD=<password>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
ADMIN_NAME=Administrator
ADMIN_SESSION_HOURS=8
STUDENT_SESSION_HOURS=24
```

> **Tip**
> Keep production credentials in Railway variables or your hosting provider's secret manager. Do not commit real credentials.

## Docker Support

The backend includes a multi-stage Dockerfile:

```dockerfile
FROM maven:3.9.6-eclipse-temurin-17 AS build
FROM eclipse-temurin:17-jdk-alpine
```

Local Compose file:

```bash
docker compose up --build
```

What is currently included:

| File | Purpose |
|---|---|
| `backend/backend/Dockerfile` | Builds and runs the Spring Boot API as a Java 17 container. |
| `docker-compose.yml` | Defines backend, frontend, and MySQL service wiring for local orchestration. |
| `docker-compose.staging.yml` | Provides a staging-oriented service blueprint for backend, public website, and admin dashboard services. |
| `docker-compose.production.yml` | Provides a production-oriented service blueprint with backend, public website, database, admin dashboard, and Nginx sections. |
| `public-website/Dockerfile` | Builds the public website container. |

> **Note**
> The admin `frontend/` directory currently does not include its own Dockerfile. The compose entries that build `./frontend` are deployment placeholders until that Dockerfile is added.

## Installation

### Prerequisites

| Tool | Version |
|---|---|
| Java | 17+ |
| Node.js | 18 recommended |
| npm | 9+ |
| MySQL | 8+ |
| Maven | Wrapper included for backend |

## Running Locally

### 1. Start MySQL

Create a database named `ims`, or let the configured JDBC URL create it automatically.

```env
MYSQL_URL=jdbc:mysql://localhost:3306/ims?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
MYSQL_USERNAME=root
MYSQL_PASSWORD=<your-password>
```

### 2. Start Backend

```bash
cd backend/backend
./mvnw spring-boot:run
```

On Windows:

```powershell
cd backend/backend
.\mvnw.cmd spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

### 3. Start Frontend

```bash
cd frontend
npm install
npm run build
npx ng serve
```

Frontend runs at:

```text
http://localhost:4200
```

### Local Admin Login

```text
Email: admin@example.com
Password: Admin@123
```

> **Note**
> Change `ADMIN_EMAIL` and `ADMIN_PASSWORD` before any shared or hosted deployment.

## Future Enhancements

- Add a centralized backend error response layer for consistent API error bodies.
- Add stronger request validation models for create/update endpoints.
- Add a Dockerfile for the admin Angular frontend.
- Replace in-memory session storage with persistent/session-store backed tokens for multi-instance deployments.
- Add API documentation through OpenAPI/Swagger.
- Add role and permission modeling if more admin user types are introduced.

## Lessons Learned

- Designing a layered Spring Boot backend keeps HTTP handling, business rules, and persistence concerns easier to evolve.
- Building REST APIs against real Angular screens makes request/response shape and error handling decisions more practical.
- JPA relationships and database constraints are important for workflows such as preventing duplicate enrollments.
- Environment-based configuration keeps local MySQL development and PostgreSQL production deployment separate.
- Docker packaging is most useful when every deployable application surface has an explicit container story.

## 🤝 Contributing

This repository is maintained as a personal portfolio project. Suggestions, bug reports, and constructive feedback are welcome through GitHub Issues.

## 👨‍💻 Author

**Virendra Sonar**

Java Full Stack Developer

LinkedIn: [www.linkedin.com/in/virendra-sonar](https://www.linkedin.com/in/virendra-sonar)

Email: virendrasonar187@gmail.com
