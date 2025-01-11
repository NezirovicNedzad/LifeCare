import { Component, inject, input, OnInit, output, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { CommonModule, JsonPipe, NgIf } from '@angular/common';
import { TextInputComponent } from "../_forms/text-input/text-input.component";
import { Router } from '@angular/router';
import {ValidationE} from '../_models/validation'
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, TextInputComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent implements OnInit {
  
  private accountService=inject(AccountService);
  private toastr=inject(ToastrService);
  private fb=inject(FormBuilder)
  private router=inject(Router);
 
  cancelRegister=output<boolean>();
 
  registerForm:FormGroup=new FormGroup({});
  validationErrors:string[ ] | undefined;
  roles = [
    { role: 'Apotekar' },
    { role: 'Admin' },
    { role: 'Farmaceut' }
  ];
  ngOnInit(): void {
  this.initializeForm();
  console.log(this.roles);
  this.roles = [
    { role: 'Apotekar' },
    { role: 'Admin' },
    { role: 'Farmaceut' }
  ];
  }
  
  initializeForm(){
    this.registerForm=this.fb.group({
      name:['',Validators.required],
     
      surname:['',Validators.required],
      username:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      phone:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(15)]],
      role:['',Validators.required],
      confirmPassword:['',[Validators.required,this.matchValues('password')]]
    });
    this.registerForm.controls['password'].valueChanges.subscribe({
      next:()=>this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string) : ValidatorFn {
    return (control:AbstractControl)=>{

      return control.value==control.parent?.get(matchTo)?.value ? null :{isMatching : true}
    }
  }

  

  register(){


     this.accountService.register(this.registerForm.value).subscribe({
       next:_=>{
        this.toastr.success("Uspesno dodat novi korisnik!");

        setTimeout(()=>  this.router.navigateByUrl('/lekovi'),1500
        )
       
         this.cancel();
       },
   error:error=>{

    if (error.error && Array.isArray(error.error)) {
      this.validationErrors = error.error.map((e:ValidationE) => e.description); // Extract descriptions
    } else {
      this.validationErrors = ['An unexpected error occurred.'];
    }
    console.log(error);
    console.log(this.validationErrors);
   }
   
  })
}
cancel()
{
  this.router.navigateByUrl('');
}

}
