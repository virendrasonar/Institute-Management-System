import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterOutlet, Router, NavigationEnd } from "@angular/router";
import { filter } from "rxjs/operators";
import { NavigationComponent } from "./components/shared/navigation/navigation.component";
import { FooterComponent } from "./components/shared/footer/footer.component";
import { StudentAuthService } from "./services/student-auth.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavigationComponent, FooterComponent],
  template: `
    <div class="app-container">
      <app-navigation></app-navigation>

      <main class="main-content">
        <router-outlet></router-outlet>
      </main>

      <app-footer *ngIf="!studentAuth.isAuthenticated()"></app-footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      .main-content {
        flex: 1;
      }
    `,
  ],
})
export class AppComponent {
  title = "Institute Management System";

  constructor(private router: Router, public readonly studentAuth: StudentAuthService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
  }
}
