import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

// import interfaces
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  //constructor() { } // no vamos a utilizar esto

  // ===============
  // ### propiedades
  // ===============

  private apiKey: string = 'Ip98yBze8YqGQV5C0kbfSu6RNctQwHLk'; // API KEY of Giphy Developers
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  // resultados ==> de tipo Gif (mirar la interfaz definida)
  public resultados: Gif[] = [];

  // ===========
  // ### getter
  // ===========

  get historial() {
    return [...this._historial];
  }

  // ===========
  // ### setter
  // ===========
  setHistorial(value: string[]) {
    this._historial = value;
  }

  // ================
  // ### constructor
  // ================

  // ==> inyectar servicio de HttpClientModule
  constructor(private http: HttpClient) {
    // se ejecuta la primera y única vez que el servicio es llamado
    // RECORDAR: servicios actuan como singleton
    // aquí cargamos la información del local storage

    // ---------- local storage para búsquedas
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];

    // ---------- local storage para mostrar último resultado
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  // ===========
  // ### métodos
  // ===========

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    // ** evitar elementos repetidos -> includes
    if (!this._historial.includes(query)) {
      // voy a insertar, solo si NO existe!
      this._historial.unshift(query); // unshift -> insertar al final

      // ** limitar el historial a 10 items:
      this._historial = this._historial.splice(0, 10);

      // ** grabar en local storage
      // => utilizamos JSON.stringify() para tomar cualquier objeto y convertirlo en string
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    // ** HttpParams => para crear el root end point
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    //console.log(params.toString());

    // ** HACER EL LLAMADO PARA LA API
    // ===> utilizando ANGULAR para http requests
    this.http
      // reconstruyendo url con los params !!
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .subscribe((resp) => {
        //console.log(resp.data); // test purposes

        // ** guardando este data en los resultados:
        this.resultados = resp.data;

        // ** guardar resultados en local storage
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }

  cleanLocalStorage() {
    localStorage.clear();
  }
}
