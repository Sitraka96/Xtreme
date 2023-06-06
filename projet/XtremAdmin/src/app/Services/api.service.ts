import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.prod';
import { LocalStorageService } from './local-storage.service';
import { observable, Observable, Subject } from 'rxjs';

interface VerifyResponse {
  auth: boolean;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  api: ApiService;

  Login_url = '/admin';
  Logout_url = '/Admin/deconnecter';
  isAuth = false;

  constructor(
    private httpClient: HttpClient,
    private ls: LocalStorageService
  ) {  // Initialize api property
    this.api = this;}

  login(email: string, password: string) {
    const loginData = {
      email_admin: email,
      password_admin: password
    }

    const subject = new Subject<any>();

    this.httpClient.post(environment.baseUrl + this.Login_url, loginData).subscribe( (res: any) => {
      console.log(res);
      this.isAuth = res.auth;
      this.ls.setItem('token', res.token);
      this.ls.setItem('user', res.admin);
      subject.next({ success: true });
    }, (obj) => {
      this.isAuth = false;
      subject.next(obj);
    })

    return subject.asObservable();
  }

  logout() {
    const subject = new Subject<any>();

    this.api.verify().then((data) => {
      if (data.auth) {
        const token = this.ls.getItem('token');

        this.httpClient.post(environment.baseUrl + this.Logout_url, {}, { headers: { 'Authorization': `Bearer ${token}` } }).subscribe((res: any) => {
          this.isAuth = false;
          this.clearLocalStorage();
          subject.next(res);
        }, (error) => {
          console.log(error);
          subject.error(error);
        });
      } else {
        this.clearAuth();
        subject.next(false);
      }
    });

    return subject.asObservable();
  }
  verify(): Promise<VerifyResponse> {
    return this.httpClient.get(environment.baseUrl + '/admin/verify').toPromise().then((data: any) => {
      return { auth: data.auth, token: data.token };
    }).catch(e => ({ auth: false }));
  }

  clearLocalStorage() {
    localStorage.clear();
  }

  clearAuth() {
    this.isAuth = false;
    this.ls.removeItem('token');
  }

}
