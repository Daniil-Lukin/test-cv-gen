import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): boolean {
    if(localStorage.getItem('user') || sessionStorage.getItem('user')) {
      return true;
    } else {
      return false;
    }
  }
  
}
