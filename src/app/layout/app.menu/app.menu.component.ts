import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { PanelMenu } from "primeng/panelmenu";
import { TooltipModule } from "primeng/tooltip";
import { LayoutService } from "../../core/services/layout.service";
import { AuthService } from "../../core/services/auth.service";
import { UserService } from "../../core/services/user.service";
import { MenuNode } from "@/app/shared/models/user";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, PanelMenu, RouterModule, TooltipModule],
  templateUrl: "./app.menu.component.html",
  styleUrl: "./app.menu.component.scss",
})
export class AppMenu {
  router = inject(Router);
  configurationItems: MenuItem[] = [];
  options: MenuItem[] = [];
  layoutService = inject(LayoutService);
  private authService = inject(AuthService);
  private userService = inject(UserService);

  ngOnInit() {
    const user = this.userService.getCurrentStoredUser();
    const menu = user?.menu;

    this.configurationItems = [
      ...(menu?.config_items ?? []).map((node) => this.mapMenuNode(node)),
      {
        label: "Cerrar Sesión",
        icon: "pi pi-sign-out",
        command: () => this.logout(),
      },
    ];

    this.options = (menu?.menu_items ?? []).map((node) =>
      this.mapMenuNode(node),
    );
  }

  private mapMenuNode(node: MenuNode): MenuItem {
    const item: MenuItem = {
      label: node.nombre,
      icon: node.icon,
    };
    if (node.ruta) {
      item.state = { route: node.ruta };
    }
    if (node.children?.length) {
      item.expanded = true;
      item.items = node.children.map((child) => this.mapMenuNode(child));
    }
    return item;
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => this.router.navigate(["/auth/login"]),
    });
  }
}
