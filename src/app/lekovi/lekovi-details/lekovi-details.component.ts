import { Component, inject, OnInit } from '@angular/core';
import { LekService } from '../../_services/lek.service';
import { ActivatedRoute } from '@angular/router';
import { Lek } from '../../_models/lek';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-lekovi-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lekovi-details.component.html',
  styleUrl: './lekovi-details.component.css'
})
export class LekoviDetailsComponent implements OnInit {

 routeParam!:number;
 lek:any;
 quantity:number=1;
 private lekoviService=inject(LekService);
 
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.routeParam = Number(params.get('id')) || 0;
    });
  }
  
  ngOnInit(): void {
     console.log(this.routeParam);
    this.loadLek(this.routeParam);

  }

  loadLek(id:number)
  {
    this.lekoviService.getLek(id).subscribe({
      next:lek=>{
        this.lek=lek;
        console.log(this.lek);
      },
      error:err=>console.error('Error loading')
    })

  }
  increaseValue()
  {
    this.quantity+=1;
  }
  decreaseValue()
  {
    if(this.quantity>1)
    {
      this.quantity-=1;
    }

  }

  send()
  {
    console.log(this.quantity,this.routeParam);
    this.lek.kolicina+=this.quantity;
    this.lekoviService.obnoviZalihe(this.routeParam,this.quantity);
  }


}
