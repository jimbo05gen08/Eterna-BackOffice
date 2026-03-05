export interface Mural {
  id: string;
  nombreComercial: string;
  identificador: string;
  beneficiario: string;
  fechaNacimiento?: Date;
  fechaDefuncion?: Date;
  tienePerfil: boolean;
  tienePortada: boolean;
  tieneTxtCorto: boolean;
  tieneTxtLargo: boolean;
  estadoMural?: 'Publico' | 'Privado';
  urlPublica?: string;
  fechaCreacion: Date;
  cuentaCreadora?: string;
  creador?: string;
  tipoCuenta?: string;
}
