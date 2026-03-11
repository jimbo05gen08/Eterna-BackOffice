import { AuthService } from "@/app/core/services/auth.service";
import { LayoutService } from "@/app/core/services/layout.service";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { MessageService } from "primeng/api";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { CommonModule } from "@angular/common";
import { ToastModule } from "primeng/toast";

@Component({
  selector: "app-forget-password",
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    PasswordModule,
    FormsModule,
    RouterModule,
    RippleModule,
    CommonModule,
    ToastModule,
  ],
  templateUrl: "./reset-password.html",
  styleUrl: "./reset-password.scss",
  providers: [MessageService],
})
export class ResetPassword implements OnInit {
  //https://miapp.com/reset-password?email=luis.ventura.labrin%40gmail.com&token=wI_uxYAs7h9LP2wj1Uhio4PoSJqCk_1CDG57RhGkiTY
  token: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  checked: boolean = false;

  layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private messageService = inject(MessageService);
  private router = inject(Router);
  private loading = false;
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.token = params.get("token") || "";
      this.email = params.get("email") || "";
      console.log(this.token, this.email);
    });
  }

  resetPassword() {
    this.loading = true;

    this.authService.resetPassword(this.email).subscribe({
      next: (res) => {
        if (res.error) {
          this.messageService.add({
            severity: "error",
            summary: "Error de Autenticación",
            detail: "Usuario o contraseña incorrectos",
            sticky: false,
          });
          return;
        }
        localStorage.setItem("token", res.token);

        // Toast de éxito
        this.messageService.add({
          severity: "success",
          summary: "¡Revisa tu correo!",
          detail: res.success.mensaje,
          life: 3000,
        });

        setTimeout(() => {
          this.router.navigate(["/"], {});
        }, 3000);
      },
      error: (err) => {
        this.loading = false;

        // Toast de error
        this.messageService.add({
          severity: "error",
          summary: "Error de Autenticación",
          detail: "Usuario o contraseña incorrectos",
          sticky: false,
        });
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }
}
