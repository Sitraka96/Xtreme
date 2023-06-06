import { HttpEvent, HttpHandler, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpXsrfInterceptorService {

  constructor(
    private tokenExtrator: HttpXsrfTokenExtractor
    ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headerName = 'X-CSRFToken';
    const token = this.tokenExtrator.getToken() as string;

    if(token != null && !req.headers.has(headerName)) {

      req = req.clone({
        headers: req.headers.set(headerName, token)
      });

    }



    return next.handle(req);
  }
}
