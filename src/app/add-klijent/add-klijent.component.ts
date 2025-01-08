import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Recept } from '../_models/recepts';
import { SenderService } from '../_services/sender.service';
import { AccountService } from '../_services/account.service';
import { LekService } from '../_services/lek.service';
import { ReceptService } from '../_services/recept.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Lek } from '../_models/lek';
import { CommonModule } from '@angular/common';
import { Klijent } from '../_models/klijent';
import { KlijentService } from '../_services/klijent.service';

@Component({
  selector: 'app-add-klijent',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './add-klijent.component.html',
  styleUrl: './add-klijent.component.css'
})
export class AddKlijentComponent implements OnInit {

    receptForm:FormGroup=new FormGroup({});
    private accountService=inject(AccountService);
     private klijentService=inject(KlijentService);
      validationErrors:string[ ] | undefined;
      private fb=inject(FormBuilder)
      klijent:Klijent | undefined;
      
   
      
      ngOnInit(): void {
      
      this.initializeForm();
    
   
  
      }
      
     
  
      initializeForm(){
        this.receptForm=this.fb.group({
          ime:['',Validators.required],
         
          prezime:['',Validators.required],
          email:['',[Validators.required,Validators.email]],
          telefon:['',[Validators.required]],
          adresa:['',Validators.required],
          datumRodjenja:['',Validators.required],
          
          idApotekara:this.accountService.currentUser()?.id,
         
         
        });
       
      }
      onSubmit() {
  
        if (this.receptForm.valid) {

          this.klijent=this.receptForm.value;

          this.klijentService.AddKlijent(this.klijent);
       console.log(this.receptForm.value)
        } else {
          console.log('Form is invalid');
        }
      }
    
}
