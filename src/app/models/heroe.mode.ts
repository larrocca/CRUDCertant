export class HeroeModel{
    nombre:string ;
    poder :string ;
    vivo :boolean;
    id?:string

    constructor(
        nombre: string,
        poder: string,
        vivo: boolean,
    ){
        this.nombre = nombre
        this.vivo = vivo
        this.poder = poder
    }
}