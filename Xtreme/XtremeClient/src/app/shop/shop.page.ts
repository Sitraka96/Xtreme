import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Client } from '../Model/Client';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {

  content: any;
  myData:any;
  clientConnecte:Client=new Client();
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private authService: AuthService,
		private storage: Storage,
		private toastController: ToastController,
    private navCtrl: NavController
  ) { }
  gamePage(){
    this.navCtrl.navigateForward('/game');
  }
  statPage(){
    this.navCtrl.navigateForward('/profil');
  }
  profilPage(){
    this.navCtrl.navigateForward('/profil');
  }
  retraitPage(){
    this.navCtrl.navigateForward('/retrait');
  }
  shopPage(){
    this.navCtrl.navigateForward('/shop');
  }
  ngOnInit() {
    this.storage.get('access_token').then((token)=>{
      if(token)
      {
        let decoded = this.helper.decodeToken(token);
        let isExpired = this.helper.isTokenExpired(token);

        if(!isExpired)
        {
          this.clientConnecte=decoded.client;
        }
        else
          this.storage.remove('access_token');
      }
    })
  }
  loadSpecialInfo() {
		this.authService.getSpecialData().subscribe((res) => {
			this.myData = res;
		});
	}
  logout() {
    this.authService.logout();
  }
  clearToken() {
		// ONLY FOR TESTING!
		this.storage.remove('access_token');

		let toast = this.toastController.create({
			message: 'JWT removed',
			duration: 3000
		});
		toast.then((toast) => toast.present());
	}
}
