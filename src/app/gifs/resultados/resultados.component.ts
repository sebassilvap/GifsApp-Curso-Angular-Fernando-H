import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
})
export class ResultadosComponent {
  get resultados() {
    // después de definir la interfaz, ahora vemos que resultados es de tipo interfaz Gif
    // resultados ya tiene el tipado en el servicio
    return this.gifsService.resultados;
  }
  // inyectar servicio
  constructor(private gifsService: GifsService) {}
}
