export interface ApiResponse<T> {
  success?: Response;
  data: T;
  statusCode: number;
  message: string;
}

interface Response {
  codigo: string;
  mensaje: string;
  tipo: string;
}
