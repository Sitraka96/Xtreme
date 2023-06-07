import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { RawgService  } from '../services/rawg.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  games:any[] = [];
  constructor( 
    private http: HttpClient,
    private navCtrl: NavController,
    private rawgService: RawgService
  ) {}

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
    this.rawgService.getPopularGames().subscribe((data: any) => {
      this.games = data.results;
    });

  }

}
