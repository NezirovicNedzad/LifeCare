import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LekService } from '../../_services/lek.service';
import { Lek } from '../../_models/lek';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css'
})
export class MemberListComponent implements OnInit {
  
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

}
