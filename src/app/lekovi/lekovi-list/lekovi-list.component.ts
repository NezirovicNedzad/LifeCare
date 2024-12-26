import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LekService } from '../../_services/lek.service';
import { Lek } from '../../_models/lek';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './lekovi.html',
  styleUrl: './lekovi.css'
})
export class LekListComponent implements OnInit {
  
  private router=inject(Router)
  private lekService=inject(LekService);
  lekovi:Lek[]=[];
  ngOnInit(): void {
 this.loadLekovi();
  }

  loadLekovi(){
    this.lekService.getLekovi().subscribe({
      next:lekovi=>this.lekovi=lekovi
    })
  }
  detalji(id:number)
  {
    this.router.navigateByUrl(`/lekovi/${id}`)
  }

}
