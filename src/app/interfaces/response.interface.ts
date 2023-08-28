import { Categoria } from "./categoria.interface";

export interface Reponse {
  tipo: string;
  codigo: string;
  mensaje: string;
  cuerpo: cuerpoResponse;
}

export interface cuerpoResponse {
  pagina: number;
  tamanio: number;
  totalResultados: number;
  data: Categoria[]
}
