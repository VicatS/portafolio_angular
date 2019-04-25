import { Component, OnInit } from '@angular/core';

// recibir datos a travez de la URL
import { ActivatedRoute } from '@angular/router';

import { ProductosService } from 'src/app/services/productos.service';

import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: ProductoDescripcion;
  id: string;
  constructor(
    private route: ActivatedRoute,
    public productoSerive: ProductosService
    ) { }

  ngOnInit() {
    // function for give id of product
    this.route.params.subscribe( parametros => {
      // console.log(response["id"]);
      this.productoSerive.getProducto(parametros['id']).subscribe((producto: ProductoDescripcion) => {
        this.id = parametros['id'];
        this.producto = producto;
      });
    });
  }

}
