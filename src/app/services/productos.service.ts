import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductosI } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  cargando = true;
  productos: ProductosI[] = [];
  productosFiltrado: ProductosI[] = [];
  termino: '';
  constructor( private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
       this.http
         .get(
           'https://angular-html-basico.firebaseio.com/productos_idx.json'
         )
         .subscribe((response: ProductosI[]) => {
           this.productos = response;
           setTimeout(() => {
             this.cargando = false;
             resolve();
           }, 1000);
         });
    });

  }

  getProducto( id: string) {
    this.cargando = false;
    return this.http.get(
      `https://angular-html-basico.firebaseio.com/productos/${ id }.json`
    );
  }

  buscarProducto(termino: string) {
    if (this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then(() => {
        // ejecutar despues de tener los productos
        // Aplicar filtros
        this.filtrarProductos( termino );
      });
    } else {
       this.filtrarProductos(termino);
    }
  }

  private filtrarProductos( termino: string) {
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.productos.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if (
        prod.categoria.indexOf(termino) >= 0 ||
        tituloLower.indexOf(termino) >= 0
      ) {
        this.productosFiltrado.push(prod);
      }
    });
  }
}
