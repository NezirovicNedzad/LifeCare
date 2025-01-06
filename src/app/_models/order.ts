import { Prodaja } from "./prodaja"

export interface Order{


    ime: string,
      klijentId: number,
      telefon: string,
      adresa:string,
      email:string,
      datum:string
      prodajaDetalji:Prodaja[]
      cenaTotal:number
}