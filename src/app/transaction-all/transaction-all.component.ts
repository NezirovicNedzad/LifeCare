import { Component, inject, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SenderService } from '../_services/sender.service';
import { LekService } from '../_services/lek.service';
import { Lek } from '../_models/lek';
import { ReceptService } from '../_services/recept.service';
import { ReceptsForKlijent } from '../_models/receptsKlijent';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-all',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-all.component.html',
  styleUrl: './transaction-all.component.css'
})
export class TransactionAllComponent implements OnInit {
  quantity: number = 1;
  quantities: any = {};

  // Method to track items by id for *ngFor
  selectedLekovi: Lek[] = []; 
  private dataService=inject(SenderService);
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
this.loadLekovi();

this.loadRecepti(this.receivedData.klijentId);
  }

  loadLekovi()
  {this.lekService.getLekovi().subscribe({
    next: (lekovi) => {
      this.lekovi = lekovi;
      console.log('Fetched lekovi:', lekovi);
    },
    error: (err) => console.error('Error loading lekovi:', err),
  
  
  })}

  loadRecepti(id:number)
  {

this.receptService.loadKlijentRecepts(id).subscribe({
  next:(recepti)=>{
    this.recepti=recepti;
    console.log(recepti);
  },
  error: (err) => console.error('Error loading lekovi:', err),

})
  }


  trackById(index: number, lek: any): number {
    return lek.id;
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
  sendData(newLekovi:Lek[]) {
    // Get current data (including lekovi) from the service
  const currentData = this.dataService.getCurrentData();

  // Merge current lekovi with the new lekovi array
  const updatedLekovi = currentData?.lekovi ? [...currentData.lekovi, ...newLekovi] : newLekovi;

  // Merge the new lekovi array into the current data
  const updatedData = {
    ...currentData,
    lekovi: updatedLekovi
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
      this.selectedLekovi.push(lek);
     }
     else{
      for (let i = 0; i < this.quantities[id]; i++) {
        this.selectedLekovi.push(lek);
      }
      console.log(this.selectedLekovi);
      console.log('Lek added to the cart:', lek);
      console.log('Selected lekovi:', this.selectedLekovi); // Log the updated array

      this.sendData(this.selectedLekovi);
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
}
