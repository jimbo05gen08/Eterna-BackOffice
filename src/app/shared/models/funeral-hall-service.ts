export interface FuneralHallService {
  id: string;
  nombreComercial: string;    // Ej: "GRUPO FE"
  salonVelatorio: string;     // Ej: "Los Querubines I"
  identificador: string;      // Ej: "ISO|0000121212|H"
  fechaHoraAtencion: Date;    // 26/01/2026 14:30
  beneficiario: string;       // Ej: "CARLOS PEREZ"
  fechaNacimiento: Date;      // 1/01/1960
  fechaDefuncion: Date;       // 20/01/2026
  fotoCargada: 'SI' | 'NO';   // Columna "Foto Cargada"
  mensajeResumen: string;     // Texto que incluye el (BTN MÁS)
  estado: EstadoServicio;     // Ej: "Completado"
}

export type EstadoServicio = 'Completado' | 'Pendiente' | 'En Proceso';
