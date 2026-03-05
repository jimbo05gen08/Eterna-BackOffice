import { Company } from "./company";

export interface CompanyService {
  id: string;
  servicio: string;
  descripcion: string;
  estado: string;
  fechaActivacion: string;
  company?: Company;
}
