import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { CommonModule } from "@angular/common";
import { AuthService } from "@/app/core/services/auth.service";
import { UserService } from "@/app/core/services/user.service";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { AuthLayoutComponent } from "../auth-layout/auth-layout.component";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    CommonModule,
    ProgressSpinnerModule,
    AuthLayoutComponent,
  ],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
})
export class Login {
  email: string = "";
  password: string = "";
  checked: boolean = false;

  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  loading = false;

  login() {
    this.loading = true;
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.userService.getAndStoreCurrentUser().subscribe({
            next: () => {
              this.router.navigate(["/"]);
            },
            error: () => {
              this.loading = false;
            },
          });
        }
      },
      error: (err) => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
