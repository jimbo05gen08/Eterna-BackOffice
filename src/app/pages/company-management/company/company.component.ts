import { Company } from '../../../shared/models/company';
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
        ConfirmDialogModule
    ],
    templateUrl: './company.html',
    providers: [MessageService, ConfirmationService]
})
export default class CompanyComponent implements OnInit {

    EMPRESAS_MOCK: Company[] = [
    {
        id: '100',
        ruc: '202145145214',
        razonSocial: 'GRUPO FE SRL',
        nombreComercial: 'GRUPO FE',
        correoContacto: 'contacto@grupofe.com.pe',
        telefonoContacto: '01-1254563',
        direccion: 'Jr Prado Este 3580',
        representanteLegal: 'Juan Perez',
        url: 'www.grupofe.com.pe',
        pais: 'Perú',
        estado: 'Activo'
    },
    {
        id: '101',
        ruc: '20458796321',
        razonSocial: 'INVERSIONES AMAZONAS SAC',
        nombreComercial: 'AMAZONAS CORP',
        correoContacto: 'info@amazonascorp.pe',
        telefonoContacto: '065-123456',
        direccion: 'Av La Marina 1250',
        representanteLegal: 'Luis Ramirez',
        url: 'www.amazonascorp.pe',
        pais: 'Perú',
        estado: 'Activo'
    },
    {
        id: '102',
        ruc: '20698745123',
        razonSocial: 'SERVICIOS GENERALES DEL NORTE EIRL',
        nombreComercial: 'SG NORTE',
        correoContacto: 'ventas@sgnorte.pe',
        telefonoContacto: '01-7894561',
        direccion: 'Calle Los Olivos 452',
        representanteLegal: 'María Torres',
        url: 'www.sgnorte.pe',
        pais: 'Perú',
        estado: 'Inactivo'
    }
    ];

    companyDialog: boolean = false;

    companies = signal<Company[]>([]);

    company!: Company;

    selectedCompanies!: Company[] | null;

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
        this.companies.set(this.EMPRESAS_MOCK);

        this.cols = [
            { field: 'ruc', header: 'RUC', customExportHeader: 'Product Code' },
            { field: 'name', header: 'Name' },
            { field: 'image', header: 'Image' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.company = {} as Company;
        this.submitted = false;
        this.companyDialog = true;
    }

    editProduct(company: Company) {
        this.company = { ...company };
        this.companyDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.companies.set(this.companies().filter((val) => !this.selectedCompanies?.includes(val)));
                this.selectedCompanies = null;
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
        this.companyDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: CompanyService) {
        this.confirmationService.confirm({
            message: '¿Está seguro que quiere eliminar ' + product.servicio + '?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.companies.set(this.companies().filter((val) => val.id !== product.id));
                this.company = {} as Company;
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
        for (let i = 0; i < this.companies().length; i++) {
            if (this.companies()[i].id === id) {
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

    saveCompany() {
        this.submitted = true;
        let _companies = this.companies();
        if (this.company.nombreComercial?.trim()) {
            if (this.company.id) {
                _companies[this.findIndexById(this.company.id)] = this.company;
                this.companies.set([..._companies]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.company.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.companies.set([..._companies, this.company]);
            }

            this.companyDialog = false;
            this.company = {} as Company;
        }
    }
}
