import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';
import { EquipoPagina } from '../interfaces/equipo-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  equipo: EquipoPagina[];
  cargada = false;

  constructor(private http: HttpClient) {
    this.cargarInfo();
    this.cargarEquipo();
  }

  private cargarInfo() {
    // Leer el archivo JSON
    this.http
      .get('assets/data/data-pagina.json')
      .subscribe((response: InfoPagina) => {
        this.cargada = true;
        this.info = response;
      });
  }

  private cargarEquipo() {
    this.http.get('https://angular-html-basico.firebaseio.com/equipo.json')
    .subscribe((response: EquipoPagina[]) => {
      this.equipo = response;
      console.log(response);
    });
  }
}
