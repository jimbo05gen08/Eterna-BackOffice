import { AuthService } from '@/app/core/services/auth.service';
import { LayoutService } from '@/app/layout/service/layout.service';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-forget-password',
    imports: [
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        PasswordModule,
        FormsModule,
        RouterModule,
        RippleModule,
        CommonModule,
    ],
    templateUrl: './forget-password.html',
    styleUrl: './forget-password.scss',
    providers: [MessageService],
})
export class ForgetPassword {
    email: string = '';
    password: string = '';
    checked: boolean = false;
    show1: boolean = true;
    show2: boolean = false;

    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    messageService = inject(MessageService);
    router = inject(Router);
    loading = false;

    show2View() {
        this.show1 = false;
        this.show2 = true;
    }

    login() {
        this.loading = true; // Activa el spinner en el botón

        this.authService.login(this.email, this.password).subscribe({
            next: (res) => {
                if (res.error) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error de Autenticación',
                        detail: 'Usuario o contraseña incorrectos',
                        sticky: false,
                    });
                    return;
                }
                localStorage.setItem('token', res.token);

                // Toast de éxito
                this.messageService.add({
                    severity: 'success',
                    summary: '¡Bienvenido!',
                    detail: 'Sesión iniciada correctamente',
                    life: 3000,
                });

                // Redirigir tras un breve delay para que vean el mensaje
                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 1000);
            },
            error: (err) => {
                this.loading = false;

                // Toast de error
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error de Autenticación',
                    detail: 'Usuario o contraseña incorrectos',
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
