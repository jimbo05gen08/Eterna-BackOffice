import { Component, inject } from "@angular/core";
import { MenuItem } from "primeng/api";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { StyleClassModule } from "primeng/styleclass";
import { LayoutService } from "@/app/core/services/layout.service";
import { AuthService } from "@/app/core/services/auth.service";
import { UserService } from "@/app/core/services/user.service";
import { Router } from "@angular/router";
import { OverlayBadge } from "primeng/overlaybadge";
import { AvatarModule } from "primeng/avatar";
import { TieredMenuModule } from "primeng/tieredmenu";
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    OverlayBadge,
    AvatarModule,
    TieredMenuModule,
    ButtonModule,
  ],
  templateUrl: "./app.topbar.component.html",
  styleUrl: "./app.topbar.component.scss",
})
export class AppTopbar {
  layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);

  userName = "";
  userInitial = "";
  loggingOut = false;

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
  }

  items!: MenuItem[] | undefined;

  ngOnInit() {
    const user = this.userService.getCurrentStoredUser();
    this.userName = user?.nombre || user?.email || "";
    this.userInitial = this.userName.charAt(0).toUpperCase();

    this.items = [
      {
        label: "Perfil",
        icon: "pi pi-user",
        items: [
          {
            label: "Ver perfil",
            icon: "pi pi-user",
          },
          {
            label: "Cambiar contraseña",
            icon: "pi pi-user",
          },
          {
            label: "Configuración",
            icon: "pi pi-cog",
          },
        ],
      },
      {
        label: "Ayuda",
        icon: "pi pi-info-circle",
        items: [
          {
            label: "Ayuda",
            icon: "pi pi-copy",
          },
          {
            label: "Soporte",
            icon: "pi pi-times",
          },
        ],
      },
      {
        separator: true,
      },
      {
        label: "Cerrar Sesión",
        icon: "pi pi-sign-out",
        command: () => this.logout(),
      },
    ];
  }

  logout() {
    this.loggingOut = true;
    this.authService.logout().subscribe({
      next: () => this.router.navigate(["/auth/login"]),
      error: () => (this.loggingOut = false),
    });
  }
}
