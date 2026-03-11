import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CheckboxModule } from "primeng/checkbox";
import { InputTextModule } from "primeng/inputtext";
import { PasswordModule } from "primeng/password";
import { RippleModule } from "primeng/ripple";
import { CommonModule } from "@angular/common";
import { LayoutService } from "@/app/core/services/layout.service";
import { AuthService } from "@/app/core/services/auth.service";
import { MessageService } from "primeng/api";
import { ToastModule } from "primeng/toast";
import { ProgressSpinnerModule } from "primeng/progressspinner";

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
    ToastModule,
    ProgressSpinnerModule,
  ],
  templateUrl: "./login.html",
  styleUrl: "./login.scss",
  providers: [MessageService],
})
export class Login {
  constructor(private messageService: MessageService) {}
  email: string = "";
  password: string = "";
  checked: boolean = false;

  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  router = inject(Router);
  loading = false;

  login() {
    //this.loading = true;

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        if (res.error) {
          console.log(this.messageService);
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
          summary: "¡Bienvenido!",
          detail: "Sesión iniciada correctamente",
          life: 3000,
        });

        // Redirigir tras un breve delay para que vean el mensaje
        setTimeout(() => {
          this.router.navigate(["/"]);
        }, 1000);
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
