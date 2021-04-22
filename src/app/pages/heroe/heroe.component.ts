import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../../models/heroe.mode';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor(
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
  }
  
  guardar(form: NgForm){
    if(form.invalid){
      console.log("formulario no valido")
      return 
    }
    if (this.heroe.id) {
      this._heroesService.actualizarHeroe(this.heroe).subscribe(resp =>{
        console.log(resp);
      })
    }else{
        this._heroesService.crearHeroe(this.heroe).subscribe(respuesta =>{ //subscribe siempre para agarrar la data
          console.log(respuesta)
          this.heroe = respuesta
        })
      }
  }
}
