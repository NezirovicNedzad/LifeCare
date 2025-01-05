import { Component, inject } from '@angular/core';

import {FormsModule} from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SenderService } from '../_services/sender.service';


@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule,BsDropdownModule,RouterLink,RouterLinkActive],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  accountService=inject(AccountService);
  loggedIn=false;
  recievedData:any
  dataService=inject(SenderService)
  private router=inject(Router);
  private toastr=inject(ToastrService);
  loginData = {
    email: '',
    password: ''
  };

  constructor()
  {
    this.dataService.currentData.subscribe(data => {
      this.recievedData = data;
    });
  }


  onLoginSubmit() {
   this.accountService.login(this.loginData).subscribe({

    next:_=>{
     this.router.navigateByUrl('/members');
      
    },
    error:error=>this.toastr.error(error.error)
    

   })
  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/');
    this.loginData.email=''
    this.loginData.password=''
    
  }
}
