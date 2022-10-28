import { Component } from '@angular/core';

// import servicios
import { GifsService } from './../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  // ### getter
  get historial() {
    return this.gifsService.historial; // retornar el array de historial de búsqueda
  }

  // ### métodos
  buscar(termino: string) {
    //console.log(termino); // imprime el término de búsqueda
    this.gifsService.buscarGifs(termino);
  }

  // inyectando servicio para su uso
  constructor(private gifsService: GifsService) {}

  clearHistory() {
    //console.log('History cleared!'); //test
    this.gifsService.setHistorial([]);
    this.gifsService.cleanLocalStorage();
    this.gifsService.buscarGifs('');
  }
}
