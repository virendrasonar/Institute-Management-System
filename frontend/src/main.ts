import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { importProvidersFrom } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { routes } from "./app/app.routes";
import { AdminAuthInterceptor } from "./app/services/admin-auth.interceptor";

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: "top",
        anchorScrolling: "enabled",
      }),
    ),
    { provide: HTTP_INTERCEPTORS, useClass: AdminAuthInterceptor, multi: true },
  ],
}).catch((err) => console.error(err));
