export interface StreamingService {
  id: string;
  nombreComercial: string;
  modulo: string;
  identificador: string;
  fechaHoraAtencion: Date;
  beneficiario: string;
  fechaNacimiento: Date;
  fechaDefuncion: Date;
  estadoInvitacion: Estado;
  linkInvitacion: string;
}

type Estado = 'Enviado' | 'Pendiente' | 'Fallido';
