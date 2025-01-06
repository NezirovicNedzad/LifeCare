import { Component, inject, OnInit } from '@angular/core';
import { SenderService } from '../_services/sender.service';
import { Order } from '../_models/order';
import { TransactionService } from '../_services/transaction.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  private dataService=inject(SenderService);
  order:Order | undefined;
  private transactionService=inject(TransactionService);



  ngOnInit(): void {
  this.order=this.dataService.getCurrentData();
  }
  showAlert(): void {
    const userConfirmed = confirm('Da li zelite da izdate ove lekove?');
    if (userConfirmed) {
      this.transactionService.dodajTransakciju(this.order);
    } else {
      alert('You chose NO!');
    }
  }  
  





}
