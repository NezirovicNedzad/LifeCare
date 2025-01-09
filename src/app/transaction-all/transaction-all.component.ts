import { Component, inject, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SenderService } from '../_services/sender.service';
import { LekService } from '../_services/lek.service';
import { Lek } from '../_models/lek';
import { ReceptService } from '../_services/recept.service';
import { ReceptsForKlijent } from '../_models/receptsKlijent';
import { ToastrService } from 'ngx-toastr';
import { Prodaja } from '../_models/prodaja';
import { Order } from '../_models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-all.component.html',
  styleUrl: './transaction-all.component.css'
})
export class TransactionAllComponent implements OnInit {
  quantity: number = 1;

  totalRecords = 0;
  pageSize = 8; // Matches backend default
  pageNumber = 1;
  totalPages = 0;
 showDots=false;
  quantities: any = {};
cena:number=0;
pages: number[] = [];
  // Method to track items by id for *ngFor
  selectedLek: Lek | undefined; 
  private dataService=inject(SenderService);
  private router=inject(Router)
  private lekService=inject(LekService);
  private receptService=inject(ReceptService);
  private toastr=inject(ToastrService);
  lekovi:Lek[] | undefined;
  recepti:ReceptsForKlijent[] | undefined;
  receivedData: any;

  ngOnInit() {
    this.dataService.currentData.subscribe(data => {
      this.receivedData = data;
    });
console.log("Data:",this.receivedData);
    if(!this.receivedData)
    {
      console.log(!this.receivedData);
      this.router.navigateByUrl('/transakcije')
    }
this.loadLekovi();

this.loadRecepti(this.receivedData.klijentId);
  }

  loadLekovi(){
    this.lekService.getLekByName("", this.pageNumber,this.pageSize).subscribe({
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

  loadRecepti(id:number)
  {

this.receptService.loadKlijentRecepts(id).subscribe({
  next:(recepti)=>{
  
    this.recepti=recepti;
    console.log(recepti);
  }

})
  }


  increaseQuantity(lekId: number) {
    if (!this.quantities[lekId]) {
      this.quantities[lekId] = 1; // initialize if not yet set
    }
    this.quantities[lekId]++;
    console.log(this.quantities[lekId]);
  }

  // Decrease quantity for specific lek
  decreaseQuantity(lekId: number) {
    if (this.quantities[lekId] && this.quantities[lekId] > 1) {
      this.quantities[lekId]--;
    }
  }
  sendData(newLek:Lek,kolicinaProizvoda:number,receptId?:number) {
    // Get current data (including lekovi) from the service
  const currentData = this.dataService.getCurrentData();
  const newProdaja: Prodaja = {
    ...newLek,
    idLeka:newLek.id,
    kolicinaProizvoda,
    idRecepta:receptId,
  };

  
  // Merge current lekovi with the new lekovi array
  const updatedLekovi:Prodaja[]  = currentData?.prodajaDetalji ? [...currentData.prodajaDetalji, newProdaja] : [newProdaja];

  // Merge the new lekovi array into the current data
  const updatedData : Order = {
    ...currentData,
    prodajaDetalji: updatedLekovi
  };

  // Send the updated data to the service
  this.dataService.changeData(updatedData);
  }

  placeOrder(id:number) {
    // Logic for placing the order
    const lek = this.lekovi?.find(l => l.id === id);
    
    
    if (lek) {
      // Add the lek to the selectedLekovi array
      if(this.quantities[id]==undefined)
        {
         this.quantities[id]=1;
        }
      this.selectedLek=lek;
      if(lek.naRecept)
      {

       const receptId:number=this.findReceptId(id);
       
       this.sendData(this.selectedLek,this.quantities[id],receptId);
       // Show success messagese
       this.toastr.success(`Uspesno ste dodali u korpu ${lek.naziv}`);

 
      }
      else
      {
       
        console.log('Lek added to the cart:', lek);
        console.log('Selected lekovi:', this.selectedLek); // Log the updated array
     
        this.sendData(this.selectedLek,this.quantities[id]);
        // Show success messagese
        this.toastr.success(`Uspesno ste dodali u korpu ${lek.naziv}`);
    
      }
     
     
   
    
    } else {
      console.log('Lek not found:', id);
      this.toastr.error('Error: Lek not found.');
    }
  }
  isLekInRecepti(lekId: number): boolean | undefined {
    return this.recepti?.some(recept => recept.idLeka === lekId);
  }

  pogledajRecepte(){
 this.router.navigateByUrl('recepti/'+this.receivedData.klijentId);
    
  }
  findReceptId(lekId:number)
  {

    var recept:number=0;
    this.recepti?.map(r=>{

      if(r.idLeka==lekId)
      {
        recept=r.id;
      }
    })
    return recept;

  }
  CalculateCena()
  {
    this.receivedData.prodajaDetalji.map((p: any)=>{
      this.cena+=p.cena*p.kolicinaProizvoda;
    })

    this.receivedData.cenatTotal=this.cena;
    
  }


  removeKlijent()
  {
    if(window.confirm('Da li stvarno zelite da izaberete drugog klijenta?'))
    {
      localStorage.removeItem('data');
      window.location.replace('transakcije')
    }
   
  }

  setupPagination() {
    const visiblePages = 4; // Number of visible pages
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
