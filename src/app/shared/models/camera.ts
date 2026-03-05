export interface Camara {
  codigo: string;
  nombre: string;
  ipPublica: string;
  urlPublica: string;
  estado: 'Activo' | 'Inactivo';
}
