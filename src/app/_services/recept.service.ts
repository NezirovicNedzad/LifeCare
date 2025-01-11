import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReceptsForKlijent } from '../_models/receptsKlijent';
import { Recept } from '../_models/recepts';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReceptService {


  baseUrl=environment.apiUrl;
   private http=inject(HttpClient);
   private accountService=inject(AccountService);
   private toastr=inject(ToastrService);
   private router=inject(Router);

   loadKlijentRecepts(idKlijenta:number)
   {
    
   return this.http.get<ReceptsForKlijent[]>('https://nedzad6-001-site1.mtempurl.com/api/recept/klijent/'+idKlijenta);
   }
   
   loadKlijentReceptsPagin(idKlijenta:number,pageNumber:number,pageSize:number)
   {
    const params = new HttpParams()
          .set('pageSize',pageSize.toString())
          .set('pageNumber', pageNumber.toString());
   return this.http.get<any>('https://nedzad6-001-site1.mtempurl.com/api/recept/klijentPagin/'+idKlijenta,{params,...this.getHttpOptions()});
   }


   AddRecept(recept:Recept | undefined){

    this.http.post('https://nedzad6-001-site1.mtempurl.com/api/recept', recept).subscribe({
      next: (response) => {
      
        this.toastr.success("Uspesno ste dodali recept!");
        
        setTimeout(() => {
         // Remove item from localStorage
         // Navigate to the route
         this.router.navigateByUrl('transakcije');

        }, 1500);
      
      },
      error: (err) => {
        this.toastr.error(`Neuspesna dodaja ${err}!`);
      }
    });
   }
    getHttpOptions(){
       return{
         headers:new HttpHeaders({
           Authorization:`Bearer ${this.accountService.currentUser()?.token}`
         })
       }
     }
}
