import { Platform, AlertController } from '@ionic/angular';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Storage } from '@ionic/storage'
import { environment } from '../../environments/environment';
import {tap, catchError} from 'rxjs/operators';
import {BehaviorSubject, Observable, from, of} from 'rxjs'

const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = environment.url;
  client = null;
  authenticationState = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private storage: Storage,
    private plt: Platform,
    private alertController : AlertController
  ){
    this.plt.ready().then(()=>{
      this.checkToken()
    })
    this.storage.create();
  }
  checkToken()
  {
    this.storage.get(TOKEN_KEY).then((token)=>{
      if(token)
      {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if(!isExpired)
        {
          this.client = decoded;
          this.authenticationState.next(true);
        }
        else
          this.storage.remove(TOKEN_KEY);
      }
    })
  }
  inscription(credentials:any) {
		return this.http.post(`${this.url}/inscription`, credentials).pipe(
			catchError((e) => {
				this.showAlert(e.error.message);
				throw new Error(e);
			})
		);
	}

  connexion(credentials:any) {
		return this.http.post(`${this.url}/login`, credentials).pipe(
			tap((res:any) => {
				this.storage.set(TOKEN_KEY, res['token']);
				this.client = this.helper.decodeToken(res['token']);
				this.authenticationState.next(true);
			}),
			catchError((e) => {
				this.showAlert(e.error.message);
				throw new Error(e);
			})
		);
	}

	logout(): Observable<void> {
		return from(this.storage.remove(TOKEN_KEY)).pipe(
		  tap(() => {
			this.authenticationState.next(false);
		  })
		);
	  }

  	getSpecialData() {
		return this.http.get(`${this.url}/clients`).pipe(
			catchError((e) => {
				let status = e.status;
				if (status === 401) {
					this.showAlert("Vous n'etes pas autoriser pour cette page");
					this.logout();
				}
				throw new Error(e);
			})
		);
	}

  isAuthenticated() {
		return this.authenticationState.value;
	}

  	showAlert(msg:any) {
		let alert = this.alertController.create({
			message: msg,
			header: 'Error',
			buttons: ['OK']
		});
		alert.then((alert) => alert.present());
	}

}
