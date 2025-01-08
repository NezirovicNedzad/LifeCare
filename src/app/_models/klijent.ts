export interface Klijent {

    id:number,
    ime:string,
    prezime:string,
    datumRodjenja:Date,
    adresa:string,
    telefon:string,
    email:string;
    idApotekara?:number;
}