import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Klijent } from '../_models/klijent';
import { Router, RouterLink } from '@angular/router';
import { KlijentService } from '../_services/klijent.service';
import { TransactionAllComponent } from "../transaction-all/transaction-all.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SenderService } from '../_services/sender.service';
import { Order } from '../_models/order';

@Component({
  selector: 'app-transakcije',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './transakcije.component.html',
  styleUrl: './transakcije.component.css'
})
export class TransakcijeComponent implements OnInit {
private dataService=inject(SenderService)
  router=inject(Router);
 klijenti:Klijent[] | undefined
 searchQuery: string = '';

 filteredKlijenti: Klijent[] = [];
selectedKlijent:Klijent | undefined;
  ngOnInit(): void {
  if(this.dataService.getCurrentData())
  {this.router.navigateByUrl('transakcije/detalji')}
    this.loadClients();
  
  
  }

  private klijentService=inject(KlijentService)


  loadClients()
  {


    this.klijentService.getKlijenti().subscribe({
      next:(klijenti)=>{
        this.klijenti=klijenti;
        console.log(this.klijenti);
        this.filteredKlijenti = klijenti;        
      }
    })
  }


  filterOptions(): void {
    if (this.klijenti) {
      this.filteredKlijenti = this.klijenti.filter((klijent) =>
        klijent.ime.toLowerCase().includes(this.searchQuery.toLowerCase()) // Assuming 'name' is the property you're filtering by
      );
    }
    this.selectedKlijent=this.filteredKlijenti[0];
  }
  sendData(klijent:any) {
    
    const data:Order = {
      cenaTotal:0,
      ime: `${klijent.ime} ${klijent.prezime}`,
      klijentId: klijent.id,
      telefon: klijent.telefon,
      adresa: klijent.adresa,
      email: klijent.email,
      datum: this.formatDate(klijent.datumRodjenja.toString()),
      prodajaDetalji: []
    };
    
    this.dataService.changeData(data);
  }
  onIzaberi(){
    if (this.selectedKlijent) {
      this.sendData(this.selectedKlijent);
      this.router.navigateByUrl('transakcije/detalji');
    } else {
      console.error('No client selected');
    }
   
  }
  onSelectClient(event: Event) {
    const target = event.target as HTMLSelectElement; // Explicit cast
    const klijentId = target.value; // Get the value from the select element
  
    if (klijentId && this.klijenti) {
      const parsedId = parseInt(klijentId, 10); // Convert the value to a number
      this.selectedKlijent = this.klijenti.find((klijent) => klijent.id === parsedId) || undefined;
  
      if (!this.selectedKlijent) {
        console.error('Client not found.');
      }
    } else {
      console.error('Invalid selection.');
    }
  }

  formatDate(dateString: string): string {
    const [datePart] = dateString.split('T'); // Split at 'T' and take the first part
    return datePart; // Return the date part directly
  }
}
