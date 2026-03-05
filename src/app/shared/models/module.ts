import { Camara as Camera } from "./camera";

export interface Modulo {
  id: string;
  nombreComercial: string; // Ej: "GRUPO FE"
  modulo: string;          // Ej: "San Gabriel"
  zona: string;            // Ej: "Huachipa"
  ubicacion: string;       // Ej: "H30"
  cantCamaras: number;     // Ej: 1
  estado: 'Activo' | 'Inactivo';
  camaras: Camera[];       // Relación: Un módulo tiene varias cámaras
}
