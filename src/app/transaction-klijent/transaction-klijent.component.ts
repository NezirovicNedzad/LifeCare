import { Component, inject, OnInit } from '@angular/core';
import { TransactionService } from '../_services/transaction.service';
import { ActivatedRoute } from '@angular/router';
import { KlijentService } from '../_services/klijent.service';
import { Klijent } from '../_models/klijent';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transaction-klijent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-klijent.component.html',
  styleUrl: './transaction-klijent.component.css'
})
export class TransactionKlijentComponent implements OnInit {

  private transactionService=inject(TransactionService);
  private klijentService=inject(KlijentService);
  private route = inject(ActivatedRoute);
  totalRecords = 0;
  pageSize = 2; // Matches backend default
  pageNumber = 1;
  totalPages = 0;
  pages: number[] = [];
  showDots=false;

 routeParam!:number;
 klijent:Klijent | undefined;
  transakcije:any;
  cenaTotal:number=0;
 
 

  ngOnInit(): void {
 
    this.route.paramMap.subscribe(params => {
      this.routeParam = Number(params.get('id')) || 0;
    });

    this.loadTransKlijent(this.routeParam);

  }
 

  loadTransKlijent(id:number)
  {
    this.cenaTotal=0;
    this.transactionService.getKlijentTrans(id,this.pageSize,this.pageNumber).subscribe({
      next:(transactions)=>{
       
      console.log(transactions);
        this.transakcije=transactions.transakcije;
        this.totalRecords = transactions.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
        this.setupPagination();
      
                   
      }
    })
    this.klijentService.getKlijentById(this.routeParam).subscribe({
      next:(klijent)=>{
this.klijent=klijent;
      }
    })
    this.transactionService.getCenaKlijentovihTransakcija(this.routeParam).subscribe({
      
      next:(cena)=>{

        this.cenaTotal=cena;
      }}) 
  }
  formatDate(dateString: string): string {
    const [datePart] = dateString.split(' '); // Split at 'T' and take the first part
    return datePart; // Return the date part directly
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
      this.loadTransKlijent(this.routeParam);
    }
  }

  goToNext() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber++; this.loadTransKlijent(this.routeParam);
      console.log(this.pageNumber)
    }
  }
  goToPage(page: number) {
    if (page !== this.pageNumber) {
      this.pageNumber = page;
      this.loadTransKlijent(this.routeParam);
    }
  }
}
