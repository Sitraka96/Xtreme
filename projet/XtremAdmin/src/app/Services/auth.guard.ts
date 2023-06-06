import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private api: ApiService,
    private ls: LocalStorageService,
    private router: Router,
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    // Check if user is trying to access login page while already authenticated
    if (state.url.includes('/login') && this.api.isAuth) {
      console.log('User is already authenticated, redirecting to dashboard...');
      this.router.navigateByUrl('/dashboard');
      return false;
    }

    // Check if user is authenticated
    if (this.api.isAuth) {
      console.log('User is authenticated, allowing access...');
      return true;
    } else {
      const token = this.ls.getItem('token');

      if (token) {
        try {
          const data: any = await this.api.verify();

          if (!data) {
            this.api.clearAuth(); // supprimer le token et réinitialiser l'authentification
            console.log('Token verification failed, redirecting to login...');
            this.router.navigateByUrl('/login');
            return false;
          }

          this.api.isAuth = true;
          console.log('User is authenticated, allowing access...');
          return true;
        } catch (error) {
          this.api.clearAuth(); // supprimer le token et réinitialiser l'authentification
          console.log('Token verification failed, redirecting to login...');
          this.router.navigateByUrl('/login');
          return false;
        }
      } else {
        this.api.clearAuth(); // supprimer le token et réinitialiser l'authentification
        console.log('No token found, redirecting to login...');
        this.router.navigateByUrl('/login');
        return false;
      }
    }
  }
}
