import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

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
