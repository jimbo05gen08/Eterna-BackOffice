import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ObjectUtils } from 'primeng/utils';
import { FuneralHall } from '@/app/shared/models/funeral-hall';
import { Account } from '@/app/shared/models/account';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule
  ],
  templateUrl: './accounts.component.html',
  providers: [MessageService, ConfirmationService]
})
export default class AccountsComponent implements OnInit {
  serviceDialog: boolean = false;
  expandedRows: expandedRows = {};
  accounts = signal<Account[]>([]);
  submitted: boolean = false;
  statuses!: any[];
  @ViewChild('dt') dt!: Table;
  isExpanded: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.accounts.set([
      {
        id: '100',
        nombreComercial: 'GRUPO FE',
        cuentaCreadora: 'luisve@gmail.com',
        creador: 'Luis Ventura',
        numMurales: 2,
        fechaCreacionCuenta: new Date('2026-01-26'),
        murales: [
          {
            id: '100',
            nombreComercial: 'GRUPO FE',
            identificador: 'ISO|0000121212|H',
            beneficiario: 'CARLOS PEREZ',
            tienePerfil: true,
            tienePortada: false,
            tieneTxtCorto: false,
            tieneTxtLargo: true,
            fechaCreacion: new Date('2026-01-26'),
            tipoCuenta: 'Campo fe Premium'
          }
        ]
      }
    ]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.accounts().length; i++) {
      if (this.accounts()[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  expandAll() {
    if (ObjectUtils.isEmpty(this.expandedRows)) {
      this.expandedRows = this.accounts().reduce(
        (acc, p) => {
          if (p.id) {
            acc[p.id] = true;
          }
          return acc;
        },
        {} as { [key: string]: boolean }
      );
      this.isExpanded = true;
    } else {
      this.collapseAll();
    }
  }

  collapseAll() {
    this.expandedRows = {};
    this.isExpanded = false;
  }
}
