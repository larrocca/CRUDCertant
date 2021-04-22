import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { HeroeModel } from '../models/heroe.mode';
import {map} from 'rxjs/operators' //el map puede transformar lo que un observable trae

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url =  'https://crud-heroes-19ebd-default-rtdb.firebaseio.com'
  constructor(
    private http : HttpClient
  ) { }

  crearHeroe(heroe:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`, heroe) //post a firebase y devuleve un ID
                    .pipe(
                      map((resp:any) =>{
                        heroe.id = resp.name //igualando el heroe.id al name que devuelve por defecto resp, osea la data
                        return heroe; //ahora devolveria toda la instancia del heroe dentro de esta funcion de callback
                      })
                    )
  }

  actualizarHeroe(heroe:HeroeModel){
    const heroeTemp ={
      ...heroe
    };
    delete heroeTemp.id;

    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp) //toma el heroe.id enviado por parametro
  }
}
