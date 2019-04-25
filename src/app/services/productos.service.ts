import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosI } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductosI[] = [];
  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {
    this.http.get(
      'https://angular-html-basico.firebaseio.com/productos_idx.json'
    )
    .subscribe(( response: ProductosI[] ) => {
      console.log(response);
      this.productos = response;
      setTimeout(() => {
        this.cargando = false;
      }, 2000);
    });
  }
}
