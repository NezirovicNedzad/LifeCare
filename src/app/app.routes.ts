import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LekListComponent } from './lekovi/lekovi-list/lekovi-list.component';
import { authGuard } from './_guards/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddLekComponent } from './add-lek/add-lek.component';
import { LekoviDetailsComponent } from './lekovi/lekovi-details/lekovi-details.component';
import { TransactionAllComponent } from './transaction-all/transaction-all.component';
import { TransakcijeComponent } from './transakcije/transakcije.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ListKlijentComponent } from './list-klijent/list-klijent.component';
import { ReceptiComponent } from './recepti/recepti.component';
import { AddReceptComponent } from './add-recept/add-recept.component';
import { AddKlijentComponent } from './add-klijent/add-klijent.component';

export const routes: Routes = [

 
  {path:'',component:LoginComponent},

  
  {
    path:'',
    runGuardsAndResolvers:'always',
    canActivate:[authGuard],
    children:[
        {path:'lekovi',component:LekListComponent},
        {path:'lekovi/:id',component:LekoviDetailsComponent},
        {path:'list-klijenti',component:ListKlijentComponent},
        {path:'addKlijent',component:AddKlijentComponent},
        {path:'transakcije',component:TransakcijeComponent},
        {path:'addMed',component:AddLekComponent},
          {path:'transakcije/detalji',component:TransactionAllComponent},
          {path:'transakcije/checkout',component:CheckoutComponent},
          {path:'recepti/:id',component:ReceptiComponent},
          {path:'addRecept',component:AddReceptComponent},
          {path:'admin-register',component:RegisterComponent},
    ]

  },
{path:'errors',component:TestErrorsComponent} ,
{path:'not-found',component:NotFoundComponent} ,
{path:'server-error',component:ServerErrorComponent} ,
  
{path:'**',component:HomeComponent,pathMatch:'full'},

];
