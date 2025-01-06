export interface Prodaja{
    idLeka:number;
naziv:string,
opis:string,
proizvodjac:string,
datumIsteka:Date,
naRecept:boolean,
idRecepta?:number,
kolicinaProizvoda:number,
cena:number,
photoUrl:string
idFarmaceuta:number
}