import { Component, inject, OnInit } from '@angular/core';
import { ReceptService } from '../_services/recept.service';
import { SenderService } from '../_services/sender.service';
import { Order } from '../_models/order';
import { ReceptsForKlijent } from '../_models/receptsKlijent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepti',
  standalone: true,
  imports: [],
  templateUrl: './recepti.component.html',
  styleUrl: './recepti.component.css'
})
export class ReceptiComponent implements OnInit {
  private receptiService=inject(ReceptService);
  private dataService=inject(SenderService);

  recievedData:any;
  recepti:ReceptsForKlijent[]=[];
  private router=inject(Router);
  ngOnInit(): void {
 
this.recievedData=this.dataService.getCurrentData();

this.receptiService.loadKlijentRecepts(this.dataService.getCurrentData().klijentId).subscribe({
  next:(recepti)=>{
    this.recepti=recepti;
  }
})

  }


  addRecept()
  {
this.router.navigateByUrl('addRecept');
  }





}
