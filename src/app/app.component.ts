import { Component, OnInit, NgModule } from '@angular/core';
import {
  AgregarCategoriaRequest,
  Categoria,
  CategoriaRequest,
} from './interfaces/categoria.interface';
import { CategoriaService } from './services/categoria.service';
import { Reponse, cuerpoResponse } from './interfaces/response.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'DonPepe';
  public data: Categoria[] = [];
  public catReq: CategoriaRequest = {
    pCodigo: '',
    pNombre: '',
    ppage: 1,
    pcount: 10,
  };
  cuerpo: cuerpoResponse = {
    data: [],
    pagina: 0,
    tamanio: 0,
    totalResultados: 0,
  };
  response: Reponse = {
    codigo: '',
    cuerpo: this.cuerpo,
    mensaje: '',
    tipo: '',
  };
  response1: Reponse = {
    codigo: '',
    cuerpo: this.cuerpo,
    mensaje: '',
    tipo: '',
  };
  requestCategoria: AgregarCategoriaRequest = {
    codigo: '',
    nombre: '',
  };

  frmCategoria: FormGroup | undefined;
  frmEditarCategoria: FormGroup | undefined;
  frmEliminarCategoria: FormGroup | undefined;

  constructor(public catServ: CategoriaService, public frm: FormBuilder) {}

  ngOnInit(): void {
    this.listarCategorias();
    this.iniciarFormulario();
  }

  public iniciarFormulario() {
    this.frmCategoria = this.frm.group({
      cod: ['', Validators.required],
      nom: ['', Validators.required],
    });
    this.frmEditarCategoria = this.frm.group({
      idEdit: ['', Validators.required],
      codEdit: ['', Validators.required],
      nomEdit: ['', Validators.required],
    });
    this.frmEliminarCategoria = this.frm.group({
      idEli: ['', Validators.required],
    });
  }

  public AgregarCategoria() {
    this.requestCategoria.codigo = this.frmCategoria?.get('cod')?.value;
    this.requestCategoria.nombre = this.frmCategoria?.get('nom')?.value;
    this.catServ.AgregarCategoria(this.requestCategoria).subscribe((resp) => {
      this.response1 = resp;
    });
    setTimeout(() => {
      if(this.response1.codigo == 'OK'){
        Swal.fire(
          this.response1.codigo,
          this.response1.mensaje,
          'success'
        )
        this.listarCategorias();
      }
    }, 1000);
  }

  public listarCategorias() {
    this.catServ.obtenerCategorias(this.catReq).subscribe((resp) => {
      this.response = resp;
    });
    setTimeout(() => {
      console.table(this.response);
      this.data = this.response.cuerpo.data;
    }, 1000);
  }

  public EditarCategoria(){
  }

  public EliminarCategoria(){
  }
}
