import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReceptsForKlijent } from '../_models/receptsKlijent';

@Injectable({
  providedIn: 'root'
})
export class ReceptService {


  baseUrl=environment.apiUrl;
   private http=inject(HttpClient);
   


   loadKlijentRecepts(idKlijenta:number)
   {
    
   return this.http.get<ReceptsForKlijent[]>(this.baseUrl+'recept/klijent/'+idKlijenta);
   }
}
