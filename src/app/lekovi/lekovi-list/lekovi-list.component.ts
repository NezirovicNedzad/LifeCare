import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LekService } from '../../_services/lek.service';
import { Lek } from '../../_models/lek';
import { NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Klijent } from '../../_models/klijent';
import { KlijentService } from '../../_services/klijent.service';

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
  private klijentService=inject(KlijentService);
  lekovi:Lek[]=[];
  klijenti:Klijent[]=[];
  searchQuery: string = '';

  ngOnInit(): void {
    this.loadLekovi("");
  }
  
  loadLekovi(naziv:string){
    this.lekService.getLekByName(naziv).subscribe({
      next: (lekovi) => {
        this.lekovi = lekovi;
        console.log('Fetched lekovi:', lekovi);
      },
      error: (err) => console.error('Error loading lekovi:', err),
    
    
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
   this.lekService.getLekByName(this.searchQuery);
   this.lekService.getLekByName(this.searchQuery).subscribe({
    next:(lekovi)=>{
   this.lekovi=lekovi
    }
   });
  }

  onSearch() {
    console.log('Search button clicked with query:', this.searchQuery);
   this.lekService.getLekByName(this.searchQuery).subscribe({
    next:(lekovi)=>{
   this.lekovi=lekovi
    }
   });
    // Add your search logic here
  }
  
}
