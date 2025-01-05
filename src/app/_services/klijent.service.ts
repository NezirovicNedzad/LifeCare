import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Klijent } from '../_models/klijent';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class KlijentService{

  private http=inject(HttpClient);
private accountService=inject(AccountService);
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
  
  
}
