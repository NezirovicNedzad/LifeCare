import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const farmaceutGuard: CanActivateFn = (route, state) => {

  const accountService=inject(AccountService);
  const toastr=inject(ToastrService);

  if(accountService.currentUser()?.role=='Farmaceut'){

    return true;
  }
  else{
    toastr.error('You dont have access!')
   return false;
  }
};
