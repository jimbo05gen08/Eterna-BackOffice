import { Component, OnInit } from '@angular/core';
import { SplitterModule } from 'primeng/splitter';
import { RouterOutlet } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { LoadingComponent } from './pages/loading/loading.component';
import { TableComponent } from './pages/tables/table/table.component';
import { DashboardComponent } from './layout/component/dashboard/dashboard.component';
FormsModule;

import { Breadcrumb } from 'primeng/breadcrumb';
import { LoginComponent } from './pages/login/login.component';
import { MenuItem } from 'primeng/api';
import { HeaderComponent } from './layout/component/header/header.component';
import { FloatLabel } from 'primeng/floatlabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-root',
  standalone: true,

  imports: [
    RouterOutlet,
    ToolbarModule,
    ButtonModule,
    SplitterModule,
    FloatLabel,
    IconField,
    InputIcon,
    FormsModule,
    ReactiveFormsModule,
    Checkbox,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    Breadcrumb,
    TableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  showLabels: boolean = true;
  onToggleLabels() {
    this.showLabels = !this.showLabels;
  }
  value1: string | undefined;

  value2: string | undefined;

  value3: string | undefined;

  title = 'Eterna_primeNg';
  items3: MenuItem[] | undefined;

  home: MenuItem | undefined;

  ngOnInit() {
    this.items3 = [{ label: 'Gestion de Empresas' }, { label: 'Empresas' }];

    this.home = { icon: 'pi pi-home', routerLink: '/' };
  }

  get sidebarWidth(): string {
    return this.showLabels ? '20%' : '5%';
  }
  get containerWidth(): string {
    return this.showLabels ? '80%' : '95%';
  }
}
