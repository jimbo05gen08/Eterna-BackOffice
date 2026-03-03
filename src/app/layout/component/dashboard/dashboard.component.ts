import { Component, Input, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { PanelMenu } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { Tooltip } from 'primeng/tooltip';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PanelMenu, ButtonModule, Tooltip],
  providers: [MessageService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  items!: MenuItem[];
  itemsConfiguracion!: MenuItem[];

  @Input() showLabels: boolean = true;

  toggleLabels() {
    this.showLabels = !this.showLabels;
  }

  constructor(private router: Router) {}

  ngOnInit() {
    this.itemsConfiguracion = [
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Gestión de Perfiles',
            icon: 'pi pi-user',
          },
          {
            label: 'Gestión de Usuarios',
            icon: 'pi pi-users',
          },
        ],
      },
    ];
    this.items = [
      {
        label: 'Gestión Empresa',
        icon: 'pi pi-building-columns',
        items: [
          {
            label: 'Empresas',
            icon: 'pi pi-building',
            route: '/installation',
          },
          {
            label: 'Servicio Empresa',
            icon: 'pi pi-briefcase',
            route: '/configuration',
          },
        ],
      },
      {
        label: 'Gestión de Transmisiones',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Lista de Servicios',
            icon: 'pi pi-list',
            route: '/installation',
          },
          {
            label: 'Módulos y Cámaras',
            icon: 'pi pi-video',
            route: '/configuration',
          },
        ],
      },
      {
        label: 'Salones Velatorios',
        icon: 'pi pi-objects-column',
        items: [
          {
            label: 'Lista de Servicios',
            icon: 'pi pi-list',
            route: '/installation',
          },
          {
            label: 'Velatorios y Pantallas',
            icon: 'pi-desktop',
            route: '/configuration',
          },
        ],
      },
      {
        label: 'Gestión de Cuentas',
        icon: 'pi pi-address-book',
        items: [
          {
            label: 'Lista de Murales',
            icon: 'pi pi-imagesr',
            route: '/installation',
          },
          {
            label: 'Cuentas',
            icon: 'pi pi-user',
            route: '/configuration',
          },
          {
            label: 'Heredero Digital',
            icon: 'pi pi-crown',
            route: '/configuration',
          },
        ],
      },
    ];
  }
}
