import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table, TableModule } from "primeng/table";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { RatingModule } from "primeng/rating";
import { InputTextModule } from "primeng/inputtext";
import { TextareaModule } from "primeng/textarea";
import { SelectModule } from "primeng/select";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from "primeng/inputnumber";
import { DialogModule } from "primeng/dialog";
import { TagModule } from "primeng/tag";
import { InputIconModule } from "primeng/inputicon";
import { IconFieldModule } from "primeng/iconfield";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { CompanyService } from "@/app/shared/models/company-service";
import { Mural } from "@/app/shared/models/mural";

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: "app-company",
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
  ],
  templateUrl: "./mural-list.component.html",
  providers: [MessageService, ConfirmationService],
})
export default class MuralListComponent implements OnInit {
  MURALES_MOCK: Mural[] = [
    {
      id: "100",
      nombreComercial: "GRUPO FE",
      identificador: "ISO|0000121212|H",
      beneficiario: "CARLOS PEREZ",
      fechaNacimiento: new Date("1960-01-01"),
      fechaDefuncion: new Date("2026-01-20"),
      tienePerfil: true,
      tienePortada: false,
      tieneTxtCorto: false,
      tieneTxtLargo: true,
      estadoMural: "Publico",
      urlPublica: "www.eterna.com.pe/carlos-perez",
      fechaCreacion: new Date("2026-01-26"),
      cuentaCreadora: "luisve@gmail.com",
      creador: "Luis Ventura",
    },
    {
      id: "100",
      nombreComercial: "GRUPO FE",
      identificador: "ISO|0000121212|H",
      beneficiario: "JIMMY OBREGON",
      fechaNacimiento: new Date("1960-01-01"),
      fechaDefuncion: new Date("2026-01-20"),
      tienePerfil: false,
      tienePortada: true,
      tieneTxtCorto: true,
      tieneTxtLargo: false,
      estadoMural: "Publico",
      urlPublica: "www.eterna.com.pe/jimmyobregon",
      fechaCreacion: new Date("2026-01-26"),
      cuentaCreadora: "eli@gmail.com",
      creador: "Eli Vera",
    },
  ];

  muralDialog: boolean = false;

  murals = signal<Mural[]>([]);

  mural!: Mural;

  selectedMurals!: Mural[] | null;

  submitted: boolean = false;

  statuses!: any[];

  @ViewChild("dt") dt!: Table;

  exportColumns!: ExportColumn[];

  cols!: Column[];

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  exportCSV() {
    this.dt.exportCSV();
  }

  ngOnInit() {
    this.loadDemoData();
  }

  loadDemoData() {
    this.murals.set(this.MURALES_MOCK);

    this.cols = [
      { field: "ruc", header: "RUC", customExportHeader: "Product Code" },
      { field: "name", header: "Name" },
      { field: "image", header: "Image" },
      { field: "price", header: "Price" },
      { field: "category", header: "Category" },
    ];

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, "contains");
  }

  openNew() {
    this.mural = {} as Mural;
    this.submitted = false;
    this.muralDialog = true;
  }

  editProduct(mural: Mural) {
    this.mural = { ...mural };
    this.muralDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: "Are you sure you want to delete the selected products?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.murals.set(
          this.murals().filter((val) => !this.selectedMurals?.includes(val)),
        );
        this.selectedMurals = null;
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Products Deleted",
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.muralDialog = false;
    this.submitted = false;
  }

  deleteProduct(product: CompanyService) {
    this.confirmationService.confirm({
      message: "¿Está seguro que quiere eliminar " + product.servicio + "?",
      header: "Confirmar",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.murals.set(this.murals().filter((val) => val.id !== product.id));
        this.mural = {} as Mural;
        this.messageService.add({
          severity: "success",
          summary: "Éxito",
          detail: "Empresa borrada",
          life: 3000,
        });
      },
    });
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.murals().length; i++) {
      if (this.murals()[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = "";
    var chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case "INSTOCK":
        return "success";
      case "LOWSTOCK":
        return "warn";
      case "OUTOFSTOCK":
        return "danger";
      default:
        return "info";
    }
  }

  saveMural() {
    this.submitted = true;
    let _companies = this.murals();
    if (this.mural.nombreComercial?.trim()) {
      if (this.mural.id) {
        _companies[this.findIndexById(this.mural.id)] = this.mural;
        this.murals.set([..._companies]);
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Updated",
          life: 3000,
        });
      } else {
        this.mural.id = this.createId();
        this.messageService.add({
          severity: "success",
          summary: "Successful",
          detail: "Product Created",
          life: 3000,
        });
        this.murals.set([..._companies, this.mural]);
      }

      this.muralDialog = false;
      this.mural = {} as Mural;
    }
  }
  transferMural(mural: Mural) {
    this.messageService.add({
      severity: "success",
      summary: "Transferido",
      detail: "Mural Transferido",
      life: 3000,
    });
  }
}
