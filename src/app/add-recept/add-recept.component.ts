import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SenderService } from '../_services/sender.service';
import { AccountService } from '../_services/account.service';
import { LekService } from '../_services/lek.service';
import { ToastrService } from 'ngx-toastr';
import { Lek } from '../_models/lek';
import { ReceptService } from '../_services/recept.service';
import { Recept } from '../_models/recepts';

@Component({
  selector: 'app-add-recept',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-recept.component.html',
  styleUrl: './add-recept.component.css'
})
export class AddReceptComponent implements OnInit {

   receptForm:FormGroup=new FormGroup({});
   private dataService=inject(SenderService);
   private accountService=inject(AccountService);
   private lekService=inject(LekService);
   private receptService=inject(ReceptService);
   private toastr=inject(ToastrService);
   recept:Recept | undefined;
    validationErrors:string[ ] | undefined;
    private fb=inject(FormBuilder)
    order:any=[];
    lekoviNaRecept:Lek[]=[];
    private router=inject(Router);
 
    
    ngOnInit(): void {
      this.dataService.currentData.subscribe(data => {
        this.order = data;
      });
    this.initializeForm();
  
    this.loadLekoviNaRecept();

    }
    
    loadLekoviNaRecept()
    {

      this.lekService.getLekNaRecept().subscribe({
        next:(lekovi)=>{
          this.lekoviNaRecept=lekovi

        },
        error: (err) => console.error('Error loading lekovi:', err),
      })
    }


    initializeForm(){
      this.receptForm=this.fb.group({
        zaglavlje:['',Validators.required],
       
        invocatio:['',Validators.required],
        ordinatio:['',Validators.required],
        subskripcija:['',[Validators.required]],
        uputstvo:['',Validators.required],
        idLeka:[0,[Validators.required]],
        idKlijenta:this.order.klijentId,
        idFarmaceuta:this.accountService.currentUser()?.id,
        isDoctorPrescribed:false
       
      });
     
    }
    onSubmit() {

      if (this.receptForm.valid) {
        this.receptForm.get('idLeka')?.setValue(Number(this.receptForm.get('idLeka')?.value));
        this.recept=this.receptForm.value;
        this.receptService.AddRecept(this.recept);
      } else {
        console.log('Form is invalid');
      }
    }
  
 
    
  
    
  
}
