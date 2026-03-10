import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Router, RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";
import { PanelMenu } from "primeng/panelmenu";
import { LayoutService } from "../service/layout.service";
import { TooltipModule } from "primeng/tooltip";

@Component({
  selector: "app-menu",
  standalone: true,
  imports: [CommonModule, PanelMenu, RouterModule, TooltipModule],
  templateUrl: "./app.menu.html",
  styleUrl: "./app.menu.scss",
})
export class AppMenu {
  router = inject(Router);
  configurationItems: MenuItem[] = [];
  options: MenuItem[] = [];
  layoutService = inject(LayoutService);

  ngOnInit() {
    this.configurationItems = [
      {
        label: "Configuración",
        icon: "pi pi-cog",
        items: [
          {
            label: "Gestión de Perfiles",
            icon: "pi pi-user",
          },
          {
            label: "Gestión de Usuarios",
            icon: "pi pi-users",
          },
        ],
      },
      {
        label: "Cerrar Sesión",
        icon: "pi pi-sign-out",
      },
    ];

    this.options = [
      {
        label: "Gestión Empresa",
        icon: "pi pi-building-columns",
        items: [
          {
            label: "Empresas",
            icon: "pi pi-building",
            routerLink: ["/company-management/company"],
          },
          {
            label: "Servicios Empresa",
            icon: "pi pi-briefcase",
            routerLink: ["/company-management/company-services"],
          },
        ],
      },
      {
        label: "Gestión de Transmisiones",
        icon: "pi pi-desktop",
        items: [
          {
            label: "Lista de Servicios",
            icon: "pi pi-list",
            routerLink: ["/streaming-management/services"],
          },
          {
            label: "Módulos y Cámaras",
            icon: "pi pi-video",
            routerLink: ["/streaming-management/modules"],
          },
        ],
      },
      {
        label: "Gestión de Salones Velatorios",
        icon: "pi pi-objects-column",
        items: [
          {
            label: "Lista de Servicios",
            icon: "pi pi-list",
            routerLink: ["/funeral-halls-management/services"],
          },
          {
            label: "Velatorios y Pantallas",
            icon: "pi pi-desktop",
            routerLink: ["/funeral-halls-management/funeral-halls"],
          },
        ],
      },
      {
        label: "Gestión de Cuentas",
        icon: "pi pi-address-book",
        items: [
          {
            label: "Lista de Murales",
            icon: "pi pi-images",
            routerLink: ["/account-management/murals-list"],
          },
          {
            label: "Cuentas",
            icon: "pi pi-fw pi-user",
            routerLink: ["/account-management/accounts"],
          },
          {
            label: "Heredero Digital",
            icon: "pi pi-crown",
            routerLink: ["/account-management/digital-heir"],
          },
        ],
      },
    ];
  }
}
