import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(
    private api: ApiService,
    private ls: LocalStorageService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.ls.getItem('token');
    if (this.api.isAuth) {
      this.api.clearAuth(); // supprimer le token et réinitialiser l'authentification
      this.router.navigateByUrl('/login');
      return false;
    } else if (token) {
      return this.api.verify().then((data) => {
        if (data.auth) {
          this.api.isAuth = true;
          this.router.navigateByUrl('/');
          return false;
        } else {
          this.ls.removeItem('token');
          return true;
        }
      }).catch((err) => {
        console.log(err);
        this.ls.removeItem('token');
        return true;
      });
    } else {
      return true;
    }
  }
}
