import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../../models/heroe.mode';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Route } from '@angular/router';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel('','',false);
  heroes:HeroeModel[] = []
  id:string = '';

  constructor(
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.params.id
    console.log(id) //Es "nuevo" porque asi esta definido en el button que nos redirecciona a la pagina desde el boton "agregar"
    if (id !== 'nuevo') {
      this._heroesService.obtenerHeroePorId(id).subscribe((data:any) =>{
        this.heroe = data
        this.heroe.id = id;
      })
    }
  }
  
  guardar(form: NgForm){ //si existe el id se hace un uptadte, si no existe lo creo
    Swal.fire({
      title:'Espere',
      text: 'Guardando informacion',
      allowOutsideClick: false,
      icon: 'info'
    });
    Swal.showLoading();

    let peticion : Observable<any>;

    if(form.invalid){
      console.log("formulario no valido")
      return 
    }
    if (this.heroe.id) {
        peticion = this._heroesService.actualizarHeroe(this.heroe);
    }else{
        peticion = this._heroesService.crearHeroe(this.heroe);
      }
      peticion.subscribe(resp =>{
        Swal.fire({
          title: this.heroe.nombre,
          text: "Se actualizo correctamente",
          icon: 'success'
        });
      })
  }
}
