import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from '../../models/heroe.mode';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[] = []
  cargando:boolean = false

  constructor(
    private _heroesService: HeroesService
  ) {}
  
  ngOnInit(): void {
    this._heroesService.obtenerHeroes().subscribe((data:any) =>{
      this.heroes = data
      this.cargando = true
       console.log(data)
       console.log(this.heroes)
       })
  }

  borrarHeroe(heroe:HeroeModel, i:number){

    Swal.fire({
      title:'¿Esta seguro?',
      text:`¿Esta seguro que desea borrar el registro ${heroe.nombre}?`,
      icon:'question',
      showConfirmButton:true,
      showCancelButton:true
    }).then(
      respuesta =>{ //en el Swal recibimos una promesa como respuesta, con el .then podemos obtener su valor, si el valor retornado es true vamos a ejecutar el if, si no es true solamente se ignora la accion
        if (respuesta.value) {
          this.heroes.splice(i, 1) //que posicion del elemento debe borrar (i) y cuantos, solo uno , esto es para que se actualice en pantalla y no solo en la base de datos
          this._heroesService.borrarHeroe(heroe.id as string).subscribe();
        }
      }
    )
  }
}
