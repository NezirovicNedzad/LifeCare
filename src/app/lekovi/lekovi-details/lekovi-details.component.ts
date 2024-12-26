import { Component, inject, OnInit } from '@angular/core';
import { LekService } from '../../_services/lek.service';
import { ActivatedRoute } from '@angular/router';
import { Lek } from '../../_models/lek';

@Component({
  selector: 'app-lekovi-details',
  standalone: true,
  imports: [],
  templateUrl: './lekovi-details.component.html',
  styleUrl: './lekovi-details.component.css'
})
export class LekoviDetailsComponent implements OnInit {

 routeParam!:number;
 lek:any;
 
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
      this.routeParam = Number(params.get('id')) || 0;
    });
  }
  private lekoviService=inject(LekService);
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

}
