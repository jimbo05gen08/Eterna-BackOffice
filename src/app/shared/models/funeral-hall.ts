import { FuneralScreen } from './screen';

export interface FuneralHall {
  id: string;
  nombreComercial: string;
  salonVelatorio: string;
  zona: string;
  ubicacion: string;
  cantPantallas: number;
  pantallas: FuneralScreen[];
}
