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
import { StreamingService } from '@/app/shared/models/streaming-service';
import { Column, ExportColumn } from '@/app/shared/models/columns';
import { FuneralHallService } from '@/app/shared/models/funeral-hall-service';

@Component({
    selector: 'app-company-services',
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
    templateUrl: './funeral-hall-service-list.component.html',
    providers: [MessageService, ConfirmationService]
})
export default class FuneralHallServicesListComponent implements OnInit {
    serviceDialog: boolean = false;

    services = signal<FuneralHallService[]>([]);

    service!: FuneralHallService;

    selectedServices!: FuneralHallService[] | null;

    submitted: boolean = false;

    statuses!: any[];

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

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
        this.services.set([{
            id: '500',
            nombreComercial: "GRUPO FE",
            salonVelatorio: "Los Querubines I",
            identificador: "ISO|0000121212|H",
            fechaHoraAtencion: new Date("2026-01-26T14:30:00"),
            beneficiario: "CARLOS PEREZ",
            fechaNacimiento: new Date("1960-01-01"),
            fechaDefuncion: new Date("2026-01-20"),
            fotoCargada: 'SI',
            mensajeResumen: "Querido Carlos .....",
            estado: 'Completado'
        }]);

        this.cols = [
            { field: 'nombreComercial', header: 'Nombre Comercial' },
            { field: 'salonVelatorio', header: 'Salón Velatorio' },
            { field: 'identificador', header: 'Identificador' },
            { field: 'fechaHoraAtencion', header: 'Fecha Hora Atención' },
            { field: 'beneficiario', header: 'Beneficiario' },
            { field: 'fechaNacimiento', header: 'Fecha Nacimiento' },
            { field: 'fechaDefuncion', header: 'Fecha Defunción' },
            { field: 'fotoCargada', header: 'Foto Cargada' },
            { field: 'mensajeResumen', header: 'Mensaje Resumen' },
            { field: 'estado', header: 'Estado' }
        ];

        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
        this.service = {} as FuneralHallService;
        this.submitted = false;
        this.serviceDialog = true;
    }

    editProduct(product: FuneralHallService) {
        this.service = { ...product };
        this.serviceDialog = true;
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.services.set(this.services().filter((val) => !this.selectedServices?.includes(val)));
                this.selectedServices = null;
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
                this.services.set(this.services().filter((val) => val.id !== product.id));
                this.service = {} as FuneralHallService;
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
        for (let i = 0; i < this.services().length; i++) {
            if (this.services()[i].id === id) {
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
        let _services = this.services();
        if (this.service.nombreComercial?.trim()) {
            if (this.service.id) {
                _services[this.findIndexById(this.service.id)] = this.service;
                this.services.set([..._services]);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Updated',
                    life: 3000
                });
            } else {
                this.service.id = this.createId();
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Product Created',
                    life: 3000
                });
                this.services.set([..._services, this.service]);
            }

            this.serviceDialog = false;
            this.service = {} as FuneralHallService;
        }
    }

    modificarServicio(service: FuneralHallService) {
        this.service = { ...service }; // Clonamos el objeto
        this.serviceDialog = true;
    }

    verObservaciones(service: FuneralHallService) {
        // Lógica para abrir un log, historial o notas
        console.log('Consultando observaciones de:', service.identificador);
        this.messageService.add({
            severity: 'info',
            summary: 'Observaciones',
            detail: `Cargando notas para el beneficiario ${service.beneficiario}`
        });
    }

    copiarLink(service: FuneralHallService) {
        // Simulación de "Btn Link Modificación"
        const dummyUrl = `https://sistema.com/edit/${service.identificador}`;
        navigator.clipboard.writeText(dummyUrl);

        this.messageService.add({
            severity: 'success',
            summary: 'Copiado',
            detail: 'Enlace de modificación copiado al portapapeles'
        });
    }

    verMasMensaje(service: FuneralHallService) {
        // Lógica para el (BTN MÁS) del Mensaje Resumen
        this.confirmationService.confirm({
            header: 'Mensaje Completo',
            message: service.mensajeResumen,
            icon: 'pi pi-info-circle',
            acceptLabel: 'Cerrar',
            rejectVisible: false
        });
    }
}
