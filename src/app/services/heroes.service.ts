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

  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

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
    delete heroeTemp.id
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`,heroeTemp) //toma el heroe.id enviado por parametro, se borra el id antes para que no se cree una variable "id"
  }

  obtenerHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(map(this.crearArray)) //dentro de .pipe(map) se esta manejando la respuesta del get , que estamos instanciando en crearArray
  }

  private crearArray(heoresObj:any){ //este metodo recibe el heoresObj que contiene la data del get, se obtiene como respuesta del map cuando le instanciamos el metodo dentro
    const heroes:HeroeModel[] = []
    if (heoresObj == null) {
      return [];
    }
    console.log(heoresObj)
    Object.keys(heoresObj).forEach(key =>{ //hacer un foreach para iterar todos los objetos heroes
      const heroe: HeroeModel = heoresObj[key]
      heroe.id = key
      heroes.push(heroe)
      })
      return heroes;
  }

  obtenerHeroePorId(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }
}


//interface IDictionary<TValue> {
//  [id: string]: TValue;
//}