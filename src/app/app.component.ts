
import { Component, inject, OnInit } from '@angular/core';

import { NavComponent } from "./nav/nav.component";
import { AccountService } from './_services/account.service';
import { HomeComponent } from "./home/home.component";
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerComponent } from 'ngx-spinner';

import { SignalRService } from './_services/signal-r.service';
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
  private signalRService=inject(SignalRService);
  constructor() {}


  
  ngOnInit(): void {
  
    this.setCurrentUser();

  
     this.signalRService.startConnection();

     // Listen for notifications
     this.signalRService.addNotificationListener();
    
  }

  
  setCurrentUser(){
    const userString=localStorage.getItem('user');
    if(!userString) return;
    const user=JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  



 
}
