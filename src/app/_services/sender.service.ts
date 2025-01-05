import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SenderService {
  private dataSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null); // Initialize here

  constructor() {
    // Try to load saved data from localStorage when the service is initialized
    const savedData = localStorage.getItem('data');
    if (savedData) {
      this.dataSubject.next(JSON.parse(savedData)); // Set the data if it exists in localStorage
    }
  }
  currentData = this.dataSubject.asObservable();

  // Expose the data as an observable
  getCurrentData() {
    return this.dataSubject.getValue();
  }

  // Method to change data and save it to localStorage
  changeData(data: any) {
   
    this.dataSubject.next(data); // Update BehaviorSubject with new data
    localStorage.setItem('data', JSON.stringify(data)); // Save the data to localStorage
  }
}
