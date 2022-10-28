import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import Components
import { GifsPageComponent } from './gifs-page/gifs-page.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ResultadosComponent } from './resultados/resultados.component';

@NgModule({
  declarations: [GifsPageComponent, BusquedaComponent, ResultadosComponent],

  // GifsPageComponent es lo que muestro afuera, en el app.component.html
  exports: [GifsPageComponent],
  imports: [CommonModule],
})
export class GifsModule {}
