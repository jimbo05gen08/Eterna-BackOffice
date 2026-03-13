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
import { Column, ExportColumn } from '@/app/shared/models/columns';
import { ObjectUtils } from 'primeng/utils';
import { Modulo as Module } from '@/app/shared/models/module';

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
    templateUrl: './modules.component.html',
    providers: [MessageService, ConfirmationService]
})
export default class ModulesComponent implements OnInit {
    serviceDialog: boolean = false;
    expandedRows: expandedRows = {};
    modules = signal<Module[]>([]);
    module!: Module;
    selectedModules!: Module[] | null;
    submitted: boolean = false;
    statuses!: any[];
    @ViewChild('dt') dt!: Table;
    exportColumns!: ExportColumn[];
    cols!: Column[];
    isExpanded: boolean = false;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) { }

    exportCSV() {
        this.dt.exportCSV();
    }

    ngOnInit() {
        this.loadDemoData();
    }

    loadDemoData() {
        this.modules.set([{
            id: '100',
            nombreComercial: "GRUPO FE",
            modulo: "San Gabriel",
            zona: "Huachipa",
            ubicacion: "H30",
            cantCamaras: 2,
            estado: 'Activo',
            camaras: [
                {
                    codigo: "15AS15",
                    nombre: "CAM1",
                    ipPublica: "3.233.23.23",
                    urlPublica: "https://aws.com.pe/cam1",
                    estado: 'Activo'
                },
                {
                    codigo: "15AS16",
                    nombre: "CAM2",
                    ipPublica: "3.233.23.24",
                    urlPublica: "https://aws.com.pe/cam2",
                    estado: 'Activo'
                }
            ]
        },
        {
            id: '101',
            nombreComercial: "GRUPO FE",
            modulo: "La Molina",
            zona: "Sector 1",
            ubicacion: "M05",
            cantCamaras: 1,
            estado: 'Activo',
            camaras: [
                {
                    codigo: "20BM10",
                    nombre: "Entrada Principal",
                    ipPublica: "190.12.45.10",
                    urlPublica: "https://aws.com.pe/entrada",
                    estado: 'Activo'
                }
            ]
        },
        {
            id: '102',
            nombreComercial: "SERVICIOS SAC",
            modulo: "Centro",
            zona: "Lima",
            ubicacion: "C12",
            cantCamaras: 0,
            estado: 'Inactivo',
            camaras: []
        }]);

        this.cols = [
            { field: 'nombreComercial', header: 'Nombre Comercial' },
            { field: 'modulo', header: 'Módulo' },
            { field: 'identificador', header: 'Identificador' },
            { field: 'fechaHoraAtencion', header: 'Fecha Hora Atención' },
            { field: 'beneficiario', header: 'Beneficiario' },
            { field: 'fechaNacimiento', header: 'Fecha Nacimiento' },
            { field: 'fechaDefuncion', header: 'Fecha Defunción' },
            { field: 'estadoInvitacion', header: 'Estado Invitación' },
            { field: 'linkInvitacion', header: 'Link Invitación' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.module = {} as Module;
        this.submitted = false;
        this.serviceDialog = true;
    }

    editProduct(module: Module) {
        this.module = { ...module };
        this.serviceDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.modules.set(this.modules().filter((val) => !this.selectedModules?.includes(val)));
                this.selectedModules = null;
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

    deleteProduct(product: CompanyService) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.servicio + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.modules.set(this.modules().filter((val) => val.id !== product.id));
                this.module = {} as Module;
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Deleted',
                    life: 3000
                });
            }
        });
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.modules().length; i++) {
            if (this.modules()[i].id === id) {
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

    saveProduct() {
        this.submitted = true;
        let _services = this.modules();
        if (this.module.nombreComercial?.trim()) {
            if (this.module.id) {
                _services[this.findIndexById(this.module.id)] = this.module;
                this.modules.set([..._services]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.module.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.modules.set([..._services, this.module]);
            }

            this.serviceDialog = false;
            this.module = {} as Module;
        }
    }

    expandAll() {
        if (ObjectUtils.isEmpty(this.expandedRows)) {
            this.expandedRows = this.modules().reduce(
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
            this.collapseAll()
        }
    }

    collapseAll() {
        this.expandedRows = {};
        this.isExpanded = false;
    }
}
