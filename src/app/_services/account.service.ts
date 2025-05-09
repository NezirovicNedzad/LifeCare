import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, } from '@angular/core';
import { User } from '../_models/user';
import { map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private http=inject(HttpClient);

  baseUrl=environment.apiUrl;
  currentUser=signal<User | null>(null);
  login(model:any){
    return this.http.post<User>('https://nedzad6-001-site1.mtempurl.com/api/account/login',model).pipe(
      map(user => {

            if(user){
              localStorage.setItem('user',JSON.stringify(user));
              this.currentUser.set(user);
            }
      })
    )
  }
  register(model:any){
    return this.http.post<User>('https://nedzad6-001-site1.mtempurl.com/api/register',model).pipe(
      map(user => {

           
            return user;
      })
    )
  }


  logout()
  {

    localStorage.removeItem('user');
    localStorage.removeItem('data');
    this.currentUser.set(null);
  }
}
