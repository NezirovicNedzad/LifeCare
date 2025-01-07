import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, timer } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoolingService {

private toastrService=inject(ToastrService);
private http=inject(HttpClient);
baseUrl=environment.apiUrl;

  // Start polling every 2 minutes
  startPolling() {
    // Use timer to create a polling interval (2000ms * 60 seconds = 2 minutes)
    timer(0, 120000)  // Starts immediately and polls every 2 minutes
      .pipe(
        switchMap(() => this.checkForNewReceipt()) // Make API request every 2 minutes
      )
      .subscribe(receipt => {
        if (receipt) {
          // Show Toastr pop-up when a new receipt is found
          this.toastrService.success(`Doktor je dodao recept za klijenta :${receipt.imeKlijenta} i lek:${receipt.nazivLeka}`, 'Dodat recept!',{
            timeOut: 0,              // Disable auto close for this specific toast
            closeButton: true,       // Enable close button (X)
             // Optional: show progress bar
           
          });
          console.log(receipt.upustvo);
        }
      });
  }

  // API request to check for new receipt
  checkForNewReceipt(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'recept/check');
    
  }
}
