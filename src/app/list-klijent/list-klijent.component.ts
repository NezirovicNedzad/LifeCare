import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LekService } from '../_services/lek.service';
import { Lek } from '../_models/lek';
import { FormsModule } from '@angular/forms';
import { Klijent } from '../_models/klijent';
import { KlijentService } from '../_services/klijent.service';

@Component({
  selector: 'app-list-klijent',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './list-klijent.component.html',
  styleUrl: './list-klijent.component.css'
})
export class ListKlijentComponent {
  private router=inject(Router)
    private lekService=inject(LekService);
    private klijentService=inject(KlijentService);
     klijenti:Klijent[]=[];
    lekovi:Lek[]=[];
    searchQuery: string = '';
  
    ngOnInit(): void {
      this.loadKlijenti();
    }
    
   
    loadKlijenti()
    {
      this.klijentService.getKlijenti().subscribe({
        next:(klijenti)=>{
          this.klijenti=klijenti;
        }
      })
    }
    detalji(id:number)
    {
      this.router.navigateByUrl(`/lekovi/${id}`)
    }
    dodaj()
    {
      this.router.navigateByUrl('/addMed')
    }
    onSearchChange() {
      console.log('Search query changed:', this.searchQuery);
     this.lekService.getLekByName(this.searchQuery);
     this.lekService.getLekByName(this.searchQuery).subscribe({
      next:(lekovi)=>{
     this.lekovi=lekovi
      }
     });
    }
  
    onSearch() {
      console.log('Search button clicked with query:', this.searchQuery);
     this.lekService.getLekByName(this.searchQuery).subscribe({
      next:(lekovi)=>{
     this.lekovi=lekovi
      }
     });
      // Add your search logic here
    }
    formatDate(dateString: string): string {
      const [datePart] = dateString.split('T'); // Split at 'T' and take the first part
      return datePart; // Return the date part directly
    }

}
