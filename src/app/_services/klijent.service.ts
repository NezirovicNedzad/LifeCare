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


    return this.http.get<Klijent[]>('https://nedzad6-001-site1.mtempurl.com/ap/iklijent',this.getHttpOptions());


  }
  getKlijentByName(naziv:string)
  {
    return this.http.get<Klijent[]>('https://nedzad6-001-site1.mtempurl.com/api/klijent/search?naziv='+naziv,this.getHttpOptions())
  }  
  getKlijentById(id:number)
  {
    return this.http.get<Klijent>('https://nedzad6-001-site1.mtempurl.com/api/klijent/'+id,this.getHttpOptions())
  }  
  AddKlijent(klijent:Klijent | undefined){
    
        this.http.post('https://nedzad6-001-site1.mtempurl.com/klijent', klijent).subscribe({
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
      
      
      getHttpOptions(){
          return{
            headers:new HttpHeaders({
              Authorization:`Bearer ${this.accountService.currentUser()?.token}`
            })
          }
        }
    }
