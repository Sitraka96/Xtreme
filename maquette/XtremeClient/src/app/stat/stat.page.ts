import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.page.html',
  styleUrls: ['./stat.page.scss'],
})
export class StatPage implements OnInit {

  constructor( private navCtrl: NavController) { }

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
  }

}
