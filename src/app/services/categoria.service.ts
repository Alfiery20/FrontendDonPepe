import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgregarCategoriaRequest, CategoriaRequest } from '../interfaces/categoria.interface';
import { Reponse, cuerpoResponse } from '../interfaces/response.interface';
import { map } from 'rxjs';

const base_url = 'https://localhost:7175/';
const endPoint = 'api/Categoria/';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  obtenerCategorias(request: CategoriaRequest) {
    const url = base_url + endPoint + 'listarCategoria';
    return this.http.post(url, request)
    .pipe(
      map((resp: any) => {
        return resp
      })
    );
  }

  AgregarCategoria(request: AgregarCategoriaRequest) {
    const url = base_url + endPoint + 'agregarCategoria';
    return this.http.post(url, request)
    .pipe(
      map((resp: any) => {
        return resp
      })
    );
  }
}
