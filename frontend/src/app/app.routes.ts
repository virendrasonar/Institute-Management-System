import { Routes } from "@angular/router";
import { adminGuard } from "./guards/admin.guard";

export const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },

  {
    path: "home",
    loadComponent: () =>
      import("./components/public/homepage/homepage.component").then(
        (m) => m.HomepageComponent,
      ),
  },
  {
    path: "about",
    loadComponent: () =>
      import("./components/public/about/about.component").then(
        (m) => m.AboutComponent,
      ),
  },
  {
    path: "dashboard",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/dashboard/dashboard.component").then(
        (m) => m.DashboardComponent,
      ),
  },

  // ---------------- COURSES ----------------
  {
    path: "courses/new",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/courses/course-form/course-form.component").then(
        (m) => m.CourseFormComponent,
      ),
  },
  {
    path: "courses/edit/:id",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/courses/course-form/course-form.component").then(
        (m) => m.CourseFormComponent,
      ),
  },
  {
    path: "courses",
    loadComponent: () =>
      import("./components/courses/course-list/course-list.component").then(
        (m) => m.CourseListComponent,
      ),
  },
  {
    path: "courses/:id",
    loadComponent: () =>
      import("./components/courses/course-details/course-details.component").then(
        (m) => m.CourseDetailsComponent,
      ),
  },
  {
    path: "learn/:accessToken",
    loadComponent: () =>
      import("./components/courses/learning-course/learning-course.component").then(
        (m) => m.LearningCourseComponent,
      ),
  },

  // ---------------- STUDENTS ----------------
  // Specific routes FIRST
  {
    path: "students/manage",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/students/manage-student/manage-student.component").then(
        (m) => m.ManageStudentComponent,
      ),
  },
  {
    path: "students/manage/:id",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/students/manage-student/manage-student.component").then(
        (m) => m.ManageStudentComponent,
      ),
  },
  {
    path: "students",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/students/student-list/student-list.component").then(
        (m) => m.StudentListComponent,
      ),
  },

  // ---------------- MESSAGES ----------------
  {
    path: "messages",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/messages/message-list/message-list.component").then(
        (m) => m.MessageListComponent,
      ),
  },

  // ---------------- CONTACT ----------------
  {
    path: "contact",
    loadComponent: () =>
      import("./components/public/contact-form/contact-form.component").then(
        (m) => m.ContactFormComponent,
      ),
  },

  {
    path: "reports",
    canActivate: [adminGuard],
    loadComponent: () =>
      import("./components/reports/reports.component").then(
        (m) => m.ReportsComponent,
      ),
  },
  {
    path: "admin/login",
    loadComponent: () =>
      import("./components/auth/admin-login.component").then(
        (m) => m.AdminLoginComponent,
      ),
  },

  // Optional wildcard route (recommended)
  {
    path: "**",
    redirectTo: "/home",
  },
];
