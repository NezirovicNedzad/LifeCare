import { Component, inject, OnInit } from '@angular/core';
import { SenderService } from '../_services/sender.service';
import { Order } from '../_models/order';
import { TransactionService } from '../_services/transaction.service';
import { Popust } from '../_models/popust';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{

  private dataService=inject(SenderService);
  order:any;
  cena:number=0;
  imaPopust:boolean =false;
  message:string | undefined;
  popust:Popust | undefined;
  reducedCena:number=0;
  prodaje:any;
  private transactionService=inject(TransactionService);



  ngOnInit(): void {
    this.order=this.dataService.getCurrentData();
    this.CalculateCena(this.order);
    this.loadPopust();
   
    
 

  }

  loadPopust()
  {
    this.transactionService.getPopust(this.order?.klijentId,this.cena).subscribe({
      next:(popust)=>{
          
   
           this.imaPopust=popust.popust;
           this.reducedCena=popust.reducedCena;

      }
    })

 
   
  }

  CalculateCena(order:any)
  {
this.cena=0;
    order?.prodajaDetalji.map((x:any)=>
      this.cena+=x.cena*x.kolicinaProizvoda
    )

  }
  showAlert(): void {
    
    if(this.imaPopust)
    {
      this.order.cenaTotal=this.reducedCena;

    
    }
    
    const userConfirmed = confirm('Da li zelite da izdate ove lekove?');
    if (userConfirmed) {
      this.transactionService.dodajTransakciju(this.order);
    } else {
      alert('Niste narucilii!');
    }
  } 
  ukloni(index:number)
  {
    if(confirm("Da li zelite da uklonite ovaj lek iz narudzbine?"))
    {
    
      this.order.prodajaDetalji.splice(index,1)
   
      
      this.CalculateCena(this.order);
      if(this.imaPopust)
      {
        this.loadPopust();
      }
      this.dataService.changeData(this.order);
    }




  } 
  





}
