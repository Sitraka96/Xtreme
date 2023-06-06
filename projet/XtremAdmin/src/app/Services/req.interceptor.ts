import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { Observable, throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/Services/local-storage.service';
import { catchError,map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable()
export class ReqInterceptor implements HttpInterceptor {

  constructor(
    private ls: LocalStorageService,
    private toastr: ToastrService,
    private router: Router,
    private api: ApiService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      withCredentials: true,
      setHeaders: {
        Authorization: `Bearer ${this.ls.getItem('token')}`
      }

    });

    return next.handle(request).pipe(
      map((res: any) => {
        if (res?.body?.errors && res?.body?.errors[0]?.status === 403) {
          this.toastr.error(res?.body?.errors[0]?.message, 'Erreur');
          localStorage.clear();
          this.api.isAuth = false
          this.router.navigateByUrl('/login');
        }

        return res;
      }),
      catchError((err: any) => {
        console.log("req.interceptor.ts : catchError");
        console.log(err);
        if (err.statusText === "Forbidden") {
          localStorage.clear();
          this.api.isAuth = false
          this.router.navigateByUrl('/login');
        }

        const message =  err.error.msg ?  err.error.msg : 'Erreur interne du serveur';
        this.toastr.error(message, 'Erreur');
        return throwError(err);
      })
    )

  }
}
