import { Component, inject, OnInit } from '@angular/core';

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
export class NavComponent implements OnInit {
  accountService=inject(AccountService);
  loggedIn=false;
  recievedData:any
  cena:number =0;
  dataService=inject(SenderService)
  private router=inject(Router);
  private toastr=inject(ToastrService);
  loginData = {
    email: '',
    password: ''
  };

 
  ngOnInit(): void {
    this.dataService.currentData.subscribe(data => {
      this.recievedData = data;
      if (this.accountService.currentUser() && this.dataService.getCurrentData()) {
        this.CalculateCena(); // Initial calculation for new lek cena
      }
    });
  console.log(this.accountService.currentUser()?.role);
    
 
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

  CalculateCena()
  {
    this.cena=0
    this.recievedData.prodajaDetalji.map((p: any)=>{
      this.cena+=p.cena*p.kolicinaProizvoda;
    })
    
  }
  checkout()
  {
    this.router.navigateByUrl("transakcije/checkout");
    }
}
