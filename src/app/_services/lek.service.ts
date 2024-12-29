import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lek } from '../_models/lek';
import { AccountService } from './account.service';

@Injectable({
  providedIn: 'root'
})
export class LekService {
private http=inject(HttpClient);
private accountService=inject(AccountService);
  baseUrl=environment.apiUrl;
  

  getLekovi()
  {
    return this.http.get<Lek[]>(this.baseUrl+'lek',this.getHttpOptions());
  }

  getLek(id:number)
  {
    return this.http.get<Lek>(this.baseUrl+'lek/'+id,this.getHttpOptions())
  }
  
  getHttpOptions(){
    return{
      headers:new HttpHeaders({
        Authorization:`Bearer ${this.accountService.currentUser()?.token}`
      })
    }
  }
}
