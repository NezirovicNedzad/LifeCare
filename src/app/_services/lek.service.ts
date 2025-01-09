import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Lek } from '../_models/lek';
import { AccountService } from './account.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class LekService {
private http=inject(HttpClient);
private accountService=inject(AccountService);
private toastr=inject(ToastrService);
  baseUrl=environment.apiUrl;
  

  getLekovi()
  {
    return this.http.get<Lek[]>(this.baseUrl+'lek',this.getHttpOptions());
  }

  getLek(id:number)
  {
    return this.http.get<Lek>(this.baseUrl+'lek/'+id,this.getHttpOptions())
  }
  getLekByName(naziv: string = '', pageNumber: number = 1,pageSize?:number ): Observable<any> {
    
    if(pageSize==undefined)
    {
      pageSize=10
    }
    const params = new HttpParams()
      .set('naziv', naziv)
      .set('pageSize',pageSize.toString())
      .set('pageNumber', pageNumber.toString());
  
    return this.http.get<any>(this.baseUrl + 'lek/search', {
      params: params,
      ...this.getHttpOptions(),
    });
  }
  getLekNaRecept()
  {
    return this.http.get<Lek[]>(this.baseUrl+'lek/recept',this.getHttpOptions())
  }
  obnoviZalihe(id:number,kolicna:number){
  
      this.http.put(this.baseUrl+`lek/zalihe?id=${id}&kolicina=${kolicna}`,{} ).subscribe({
        next: (response) => {
        
          this.toastr.success("Uspesno ste obnovili zalihe recept!")
        
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
