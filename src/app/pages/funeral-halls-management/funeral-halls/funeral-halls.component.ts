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
import { Column, ExportColumn } from '@/app/shared/models/columns';
import { ObjectUtils } from 'primeng/utils';
import { FuneralHall } from '@/app/shared/models/funeral-hall';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-modules',
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
  templateUrl: './funeral-halls.component.html',
  providers: [MessageService, ConfirmationService]
})
export default class FuneralHallsComponent implements OnInit {
  serviceDialog: boolean = false;
  expandedRows: expandedRows = {};
  funeralHalls = signal<FuneralHall[]>([]);
  selectedHalls!: FuneralHall[] | null;
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
    this.funeralHalls.set([
      {
        id: '100',
        nombreComercial: 'GRUPO FE',
        salonVelatorio: 'Los Querubines',
        zona: 'Huachipa',
        ubicacion: 'H30',
        cantPantallas: 2,
        pantallas: [
          {
            codigo: '15AS15',
            nombre: 'CAM1',
            tipoPantalla: 'Resolución 4k',
            estado: 'Activo'
          },
          {
            codigo: '15AS16',
            nombre: 'CAM2',
            tipoPantalla: 'Resolución 8k',
            estado: 'Activo'
          }
        ]
      },
      {
        id: '101',
        nombreComercial: 'GRUPO FE',
        salonVelatorio: 'Los Ángeles',
        zona: 'Sector 1',
        ubicacion: 'M05',
        cantPantallas: 1,
        pantallas: [
          {
            codigo: '20BM10',
            nombre: 'Entrada Principal',
            tipoPantalla: 'Resolución 16k',
            estado: 'Activo'
          }
        ]
      },
      {
        id: '102',
        nombreComercial: 'SERVICIOS SAC',
        salonVelatorio: 'Los Jardines',
        zona: 'Lima',
        ubicacion: 'C12',
        cantPantallas: 0,
        pantallas: []
      }
    ]);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.funeralHalls.set(this.funeralHalls().filter((val) => !this.selectedHalls?.includes(val)));
        this.selectedHalls = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000
        });
      }
    });
  }

  hideDialog() {
    this.serviceDialog = false;
    this.submitted = false;
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.funeralHalls().length; i++) {
      if (this.funeralHalls()[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  expandAll() {
    if (ObjectUtils.isEmpty(this.expandedRows)) {
      this.expandedRows = this.funeralHalls().reduce(
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
