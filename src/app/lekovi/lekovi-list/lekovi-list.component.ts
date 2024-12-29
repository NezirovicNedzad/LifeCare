import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LekService } from '../../_services/lek.service';
import { Lek } from '../../_models/lek';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [RouterLink,FormsModule],
  templateUrl: './lekovi.html',
  styleUrl: './lekovi.css'
})
export class LekListComponent implements OnInit {
  
  private router=inject(Router)
  private lekService=inject(LekService);
  lekovi:Lek[]=[];
  searchQuery: string = '';

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
  dodaj()
  {
    this.router.navigateByUrl('/addMed')
  }
  onSearchChange() {
    console.log('Search query changed:', this.searchQuery);
  }

  onSearch() {
    console.log('Search button clicked with query:', this.searchQuery);
    // Add your search logic here
  }
  
}
