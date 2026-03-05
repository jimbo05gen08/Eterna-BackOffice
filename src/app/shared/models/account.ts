import { Mural } from './mural';

export interface Account {
  id: string;
  nombreComercial: string;
  cuentaCreadora: string;
  creador: string;
  numMurales: number;
  fechaCreacionCuenta: Date;
  murales: Mural[];
}
