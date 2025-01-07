import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

accountService=inject(AccountService);
  loggedIn=false;
  private router=inject(Router);
  private toastr=inject(ToastrService);
  loginData = {
    email: '',
    password: ''
  };

  onLoginSubmit() {
    this.accountService.login(this.loginData).subscribe({
 
     next:_=>{
      window.location.replace('/lekovi');
       
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
