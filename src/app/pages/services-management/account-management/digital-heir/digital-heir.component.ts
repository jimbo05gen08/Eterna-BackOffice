import { DividerModule } from 'primeng/divider';
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
import { CompanyService } from '@/app/shared/models/company-service';
import { Mural } from '@/app/shared/models/mural';
import { DigitalHeir } from '@/app/shared/models/digital-heir';
import { Column, ExportColumn } from '@/app/shared/models/columns';

@Component({
  selector: 'app-company',
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
    ConfirmDialogModule,
    DividerModule
  ],
  templateUrl: './digital-heir.component.html',
  providers: [MessageService, ConfirmationService]
})
export default class DigitalHeirComponent implements OnInit {
  HEREDEROS_MOCK: DigitalHeir[] = [
    {
      id: '100',
      nombreComercial: 'GRUPO FE',
      docTitularBase: 'DNI - 99999999',
      nombreTitularBase: 'Jóse Carlos Malaga',
      docHeredero: 'DNI - 99999999',
      nombreHeredero: 'Carlos Perez',
      correoHeredero: 'carlos@gmail.com',
      telefonoHeredero: '51959595959',
      fechaRegistro: new Date('2026-01-26')
    }
  ];

  heiDialog: boolean = false;

  digitalHeirs = signal<DigitalHeir[]>([]);

  digitalHeir!: DigitalHeir;

  selectedHeirs!: DigitalHeir[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild('dt') dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

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
    this.digitalHeirs.set(this.HEREDEROS_MOCK);

    this.cols = [
      { field: 'nombreComercial', header: 'Nombre Comercial' },
      { field: 'docTitularBase', header: 'Doc Titular Base' },
      { field: 'nombreTitularBase', header: 'Nombre Titular Base' },
      { field: 'docHeredero', header: 'Doc Heredero' },
      { field: 'nombreHeredero', header: 'Nombre Heredero' },
      { field: 'correoHeredero', header: 'Correo Heredero' },
      { field: 'telefonoHeredero', header: 'Teléfono Heredero' },
      { field: 'fechaRegistro', header: 'Fecha Registro' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  openNew() {
    this.digitalHeir = {} as DigitalHeir;
    this.submitted = false;
    this.heiDialog = true;
  }

  editProduct(mural: DigitalHeir) {
    this.digitalHeir = { ...mural };
    this.heiDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.digitalHeirs.set(this.digitalHeirs().filter((val) => !this.selectedHeirs?.includes(val)));
        this.selectedHeirs = null;
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
    this.heiDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: CompanyService) {
    this.confirmationService.confirm({
      message: '¿Está seguro que quiere eliminar ' + product.servicio + '?',
      header: 'Confirmar',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.digitalHeirs.set(this.digitalHeirs().filter((val) => val.id !== product.id));
        this.digitalHeir = {} as DigitalHeir;
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Empresa borrada',
          life: 3000
        });
      }
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.digitalHeirs().length; i++) {
      if (this.digitalHeirs()[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warn';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return 'info';
    }
  }

  saveMural() {
    this.submitted = true;
    let _companies = this.digitalHeirs();
    if (this.digitalHeir.nombreComercial?.trim()) {
      if (this.digitalHeir.id) {
        _companies[this.findIndexById(this.digitalHeir.id)] = this.digitalHeir;
        this.digitalHeirs.set([..._companies]);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000
        });
      } else {
        this.digitalHeir.id = this.createId();
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000
        });
        this.digitalHeirs.set([..._companies, this.digitalHeir]);
      }

      this.heiDialog = false;
      this.digitalHeir = {} as DigitalHeir;
    }
  }
  transferMural(mural: Mural) {
    this.messageService.add({
      severity: 'success',
      summary: 'Transferido',
      detail: 'Mural Transferido',
      life: 3000
    });
  }
}
