import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Klijent } from '../_models/klijent';
import { AccountService } from './account.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class KlijentService{

  private http=inject(HttpClient);
private accountService=inject(AccountService);
private toastr=inject(ToastrService);
private router=inject(Router);
  baseUrl=environment.apiUrl;

  
  getKlijenti()
  {


    return this.http.get<Klijent[]>(this.baseUrl+'klijent',this.getHttpOptions());


  }
  getHttpOptions(){
      return{
        headers:new HttpHeaders({
          Authorization:`Bearer ${this.accountService.currentUser()?.token}`
        })
      }
    }
   getKlijentByName(naziv:string)
    {
      return this.http.get<Klijent[]>(this.baseUrl+'klijent/search?naziv='+naziv,this.getHttpOptions())
    }  
  AddKlijent(klijent:Klijent | undefined){
    
        this.http.post(this.baseUrl+'klijent', klijent).subscribe({
          next: (response) => {
          
            this.toastr.success("Uspesno ste dodali klijenta!");
            
            setTimeout(() => {
             // Remove item from localStorage
             // Navigate to the route
             this.router.navigateByUrl('list-klijenti');
    
            }, 1500);
          
          },
          error: (err) => {
            this.toastr.error(`Neuspesna dodaja ${err}!`);
          }
        });
       }
  
  
}
