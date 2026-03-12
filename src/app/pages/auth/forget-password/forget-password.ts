import { AuthService } from "@/app/core/services/auth.service";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";

@Component({
  selector: "app-forget-password",
  imports: [
    ButtonModule,
    InputTextModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ToastModule,
    AuthLayoutComponent,
  ],
  templateUrl: "./forget-password.html",
  styleUrl: "./forget-password.scss",
})
export class ForgetPassword {
  email: string = "";

  authService = inject(AuthService);
  router = inject(Router);
  loading = false;

  resetPassword() {
    this.loading = true;

    this.authService.requestPasswordReset(this.email).subscribe({
      next: (data) => {
        setTimeout(() => {
          const link = document.createElement("a");
          const url = data.forgotlink.replace(
            "https://miapp.com",
            "http://localhost:4200/auth",
          );
          link.href = url;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
        }, 3000);
      },
      error: () => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
