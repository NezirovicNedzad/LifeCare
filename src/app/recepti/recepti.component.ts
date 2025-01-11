import { Component, inject, OnInit } from '@angular/core';
import { ReceptService } from '../_services/recept.service';
import { SenderService } from '../_services/sender.service';
import { Order } from '../_models/order';
import { ReceptsForKlijent } from '../_models/receptsKlijent';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-recepti',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recepti.component.html',
  styleUrl: './recepti.component.css'
})
export class ReceptiComponent implements OnInit {
  private receptiService=inject(ReceptService);
  private dataService=inject(SenderService);
  accountService=inject(AccountService);
  totalRecords = 0;
  pageSize = 10; // Matches backend default
  pageNumber = 1;
  totalPages = 0;
 showDots=false;
pages: number[] = [];
  recievedData:any;
  recepti:ReceptsForKlijent[]=[];
  private router=inject(Router);
  ngOnInit(): void {
 
this.recievedData=this.dataService.getCurrentData();
this.loadReceptiPagin()


  }



  loadReceptiPagin()
  {
    this.receptiService.loadKlijentReceptsPagin(this.recievedData.klijentId, this.pageNumber,this.pageSize).subscribe({
      next: (response) => {
        this.recepti = response.recepti;
        this.totalRecords = response.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.setupPagination();
        console.log('Fetched lekovi:', response);
      },
      error: (err) => console.error('Error loading lekovi:', err),
    });

  }

  addRecept()
  {
this.router.navigateByUrl('addRecept');
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
      this.loadReceptiPagin();
    }
  }

  goToNext() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++;
      this.loadReceptiPagin();
    }
  }
  goToPage(page: number) {
    if (page !== this.pageNumber) {
      this.pageNumber = page;
      this.loadReceptiPagin();
    }
  }



}
