
import { Component, inject, OnInit } from '@angular/core';

import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';
import { CheckForReceptsComponent } from "./check-for-recepts/check-for-recepts.component";
import { PoolingService } from './_services/pooling.service';
  // Add this import

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavComponent, RouterOutlet, NgxSpinnerComponent],  // Add FormsModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private accountService=inject(AccountService);
  private pollingService=inject(PoolingService);

 
  
  ngOnInit(): void {
  
    this.setCurrentUser();

    if(this.accountService.currentUser())
    {
     
      // setTimeout(() => {
      //   this.pollingService.startPolling();  // Call the method after 2 minutes
      // }, 120000);  
    }
    
  }

  
  setCurrentUser(){
    const userString=localStorage.getItem('user');
    if(!userString) return;
    const user=JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  



 
}
