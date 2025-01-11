import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
 private hubConnection!: signalR.HubConnection;

private toastr=inject(ToastrService);
private http=inject(HttpClient);
  baseUrl=environment.apiUrl;
  // Start SignalR connection
  public startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:5001/notificationHub')  // Your SignalR hub URL
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connection Started'))
      .catch(err => console.error('Error while starting SignalR:', err));
  }

  // Listen for notifications and show them using Toastr
  public addNotificationListener(): void {
    this.hubConnection.on('ReceiveNotification', (message: string) => {
      // Display the notification in Toastr
      this.checkForNewReceipt().subscribe((recept)=>{

        this.toastr.success(`Doktor je dodao recept za klijenta :${recept.imeKlijenta} i lek:${recept.nazivLeka}`, 'Dodat recept!',{
          timeOut: 0,              // Disable auto close for this specific toast
          closeButton: true,       // Enable close button (X)
           // Optional: show progress bar
         
        });
        console.log(recept.upustvo);
      })

    });
  }

  checkForNewReceipt(): Observable<any> {
      return this.http.get<any>(this.baseUrl+'recept/check');
      
    }
}
