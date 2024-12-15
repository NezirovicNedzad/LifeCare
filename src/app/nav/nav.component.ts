import { Component, inject } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService=inject(AccountService);
  loggedIn=false;
  loginData = {
    email: '',
    password: ''
  };



  onLoginSubmit() {
   this.accountService.login(this.loginData).subscribe({

    next:response=>{
      console.log(response);
      
    },
    error:error=>console.log(error)
    

   })
  }
  logout(){
    this.accountService.logout();
    this.loginData.email=''
    this.loginData.password=''
  }
}
