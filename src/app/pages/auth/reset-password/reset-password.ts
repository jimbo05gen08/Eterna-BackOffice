import { AuthService } from "@/app/core/services/auth.service";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";

@Component({
  selector: "app-forget-password",
  imports: [
    ButtonModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    CommonModule,
    AuthLayoutComponent,
  ],
  templateUrl: "./reset-password.html",
  styleUrl: "./reset-password.scss",
})
export class ResetPassword implements OnInit {
  token: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  submitted = false;

  private authService = inject(AuthService);
  private router = inject(Router);
  loading = false;
  private activatedRoute = inject(ActivatedRoute);

  private readonly passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;

  get isPasswordStrong(): boolean {
    return this.passwordRegex.test(this.password);
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }

  get isFormValid(): boolean {
    return (
      this.isPasswordStrong && this.passwordsMatch && this.password.length > 0
    );
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.token = params.get("token") || "";
      this.email = params.get("email") || "";
      console.log(this.token, this.email);
    });
  }

  resetPassword() {
    this.submitted = true;

    if (!this.isFormValid) return;

    this.loading = true;

    this.authService
      .resetPassword(this.email, this.token, this.password)
      .subscribe({
        next: () => {
          this.router.navigate(["/auth/login"]);
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
