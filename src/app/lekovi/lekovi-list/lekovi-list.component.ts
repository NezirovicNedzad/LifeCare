import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LekService } from '../../_services/lek.service';
import { Lek } from '../../_models/lek';
import { CommonModule, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Klijent } from '../../_models/klijent';
import { KlijentService } from '../../_services/klijent.service';

@Component({
  selector: 'lekovi-list',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  templateUrl: './lekovi.html',
  styleUrl: './lekovi.css'
})
export class LekListComponent implements OnInit {
  totalRecords = 0;
  pageSize = 10; // Matches backend default
  pageNumber = 1;
  totalPages = 0;


  private router=inject(Router)
  private lekService=inject(LekService);
  private klijentService=inject(KlijentService);
  lekovi:Lek[]=[];
  showDots = false;
  klijenti:Klijent[]=[];
  searchQuery: string = '';
  pages: number[] = [];
  ngOnInit(): void {
    this.loadLekovi();
  }
  
  loadLekovi(){
    this.lekService.getLekByName(this.searchQuery, this.pageNumber).subscribe({
      next: (response) => {
        this.lekovi = response.lekovi;
        this.totalRecords = response.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.setupPagination();
        console.log('Fetched lekovi:', response);
      },
      error: (err) => console.error('Error loading lekovi:', err),
    });
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
  
   this.lekService.getLekByName(this.searchQuery).subscribe({
    next:(data)=>{
   this.lekovi=data.lekovi
    }
   });
  }

  onSearch() {
    console.log('Search button clicked with query:', this.searchQuery);
   this.lekService.getLekByName(this.searchQuery).subscribe({
    next:(data)=>{
   this.lekovi=data.lekovi
    }
   });
    // Add your search logic here
  }

  setupPagination() {
    const visiblePages = 5; // Number of visible pages
    this.pages = [];
    this.showDots = false;

    if (this.totalPages <= visiblePages) {
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      this.showDots = true;
      const start = Math.max(1, this.pageNumber - 2);
      const end = Math.min(this.totalPages, start + visiblePages - 1);

      for (let i = start; i <= end; i++) {
        this.pages.push(i);
      }
    }
  }
  goToPrevious() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.loadLekovi();
    }
  }

  goToNext() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadLekovi();
    }
  }
  goToPage(page: number) {
    if (page !== this.pageNumber) {
      this.pageNumber = page;
      this.loadLekovi();
    }
  }

  
}
