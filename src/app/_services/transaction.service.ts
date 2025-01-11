import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from '../../environments/environment';
import { Order } from '../_models/order';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs';
import { Router } from '@angular/router';
import { SenderService } from './sender.service';
import { Popust } from '../_models/popust';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
private http=inject(HttpClient);
private accountService=inject(AccountService);
private toastr=inject(ToastrService)
private data=inject(SenderService);
  baseUrl=environment.apiUrl
  private router=inject(Router)
  



  getPopust(id:number | undefined,cena:number)
  {
   return  this.http.get<Popust>(this.baseUrl+'transakcija/popust/'+id+'?cenaTotal='+cena);
  }
  getKlijentTrans(id:number,pageSize:number,pageNumber:number)
  {
   return  this.http.get<any>(this.baseUrl+'transakcija/klijent/'+id+'?pageSize='+pageSize+'&pageNumber='+pageNumber);
  }
  getTrans(pageSize:number,pageNumber:number)
  {
   return  this.http.get<any>(this.baseUrl+'transakcija/?pageSize='+pageSize+'&pageNumber='+pageNumber);
  }

  getCenaKlijentovihTransakcija(id:number)
  {
    return  this.http.get<any>(this.baseUrl+'transakcija/klijent/'+id+'/cena'); 
  }

  dodajTransakciju(order:Order | undefined)
  {

    this.http.post(this.baseUrl+'transakcija', order).subscribe({
      next: (response) => {
        console.log('Transaction successful:', response);
        this.toastr.success("Uspesna transakcija!");
        
        setTimeout(() => {
          this.data.changeData(null);
          localStorage.removeItem('data'); // Remove item from localStorage
         // Navigate to the route
         window.location.replace('/transakcije');
        }, 1500);
      
      },
      error: (err) => {
        this.toastr.error(`Neuspesna transakcija ${err}!`);
      }
    });


  }
}
