import { Component, ElementRef, ViewChild } from '@angular/core';

// importar servicio
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  // usar servicio: gifs.service.ts
  // => necesitamos inyectar servicio
  constructor(private gifsService: GifsService) {} // ahora tengo acceso a todas las propiedades y métodos del servicio

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    //console.log(valor);

    // *** EVITAR INSERTAR ELEMENTOS EN BLANCO
    // trim -> para evitar meter solo espacios
    if (valor.trim().length === 0) {
      return;
    }

    this.gifsService.buscarGifs(valor);

    // ahora para borrar del input
    this.txtBuscar.nativeElement.value = '';
  }
}
