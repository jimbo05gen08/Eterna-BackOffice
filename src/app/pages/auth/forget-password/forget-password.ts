import { AuthService } from "@/app/core/services/auth.service";
import { LayoutService } from "@/app/core/services/layout.service";
import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
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
  templateUrl: "./forget-password.html",
  styleUrl: "./forget-password.scss",
  providers: [MessageService],
})
export class ForgetPassword {
  email: string = "";
  password: string = "";
  checked: boolean = false;

  layoutService = inject(LayoutService);
  authService = inject(AuthService);
  messageService = inject(MessageService);
  router = inject(Router);
  loading = false;

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
          const link = document.createElement("a");
          //https://miapp.com/reset-password?email=luis.ventura.labrin%40gmail.com&token=wI_uxYAs7h9LP2wj1Uhio4PoSJqCk_1CDG57RhGkiTY
          const url = (res.data.forgotlink as string).replace(
            "https://miapp.com",
            "http://localhost:4200/auth",
          );
          link.href = url; // Define el destino
          link.target = "_blank"; // Opcional: abre en pestaña nueva
          document.body.appendChild(link);
          link.click(); // Simula el clic
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
