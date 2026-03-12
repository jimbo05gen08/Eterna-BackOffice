export interface User {
  id: number;
  email: string;
  flg_superadmin: boolean;
  empresas: Company[];
  perm_version: number;
  acciones_por_recurso: ResourceAction[];
  menu: MenuNode[];
}

export interface Company {
  id: number;
  ruc: string;
  razon_social: string;
  nombre_comercial: string;
}

export interface ResourceAction {
  recurso_code: string;
  recurso_nombre: string;
  ruta: string;
  acciones: string[];
}

export interface MenuNode {
  code: string;
  nombre: string;
  ruta?: string;
  acciones: string[];
  children: MenuNode[];
}
