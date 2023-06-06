import { HttpClient } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket.service';
import { Component, OnInit , Input, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { NavController, ToastController } from '@ionic/angular';
import {JwtHelperService} from '@auth0/angular-jwt';
import { Client } from '../Model/Client';
import { XtremePoint } from '../Model/XtremePoint';
import { PanierService } from '../services/panier.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  content: any;
  myData:any;
  clientConnecte:Client=new Client();
  xtremepoints:any;
  panierService: any;
  constructor(
    private http: HttpClient,
    private helper: JwtHelperService,
    private authService: AuthService,
		private storage: Storage,
		private toastController: ToastController,
    private navCtrl: NavController,
    private socket:SocketService
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
  ngOnInit(): void {
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
    });
    this.http.get('http://localhost:8080/xtremepoint').subscribe(data => {
      this.xtremepoints = data;
    });
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

  panierPage(xtremepoint: XtremePoint){
    this.navCtrl.navigateForward('/panier', { 
      queryParams: { 
        id: xtremepoint.id_xtremepoint, 
        titre: xtremepoint.titre_xtremepoint, 
        prix: xtremepoint.prix_xtremepoint 
      } 
    });
  }
  printDate(date_:string){
    var dateNHour:string[];
    var date:Date;
    var dateStr;
    dateNHour = date_.split('T');
    date = new Date(dateNHour[0]);
    dateStr = date.toLocaleDateString('fr-FR', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' });

    return dateStr;
  }

  printHour(date_:string){
    var dateNHour:string[];
    var hour;
    dateNHour = date_.split('T');
    hour = "à "+dateNHour[1];
    return hour;
  }
}
