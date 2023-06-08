import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Storage } from '@ionic/storage';
import axios from 'axios';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  nom_client:string='';
  prenom_client:string='';
  pseudo_client:string='';
  confirme_mdp:string='';
  photo_profil:string="";
  data:any = null;
  datalog:any = null;
  imageSrc!:string | ArrayBuffer;
  avatarSelected = false;
  email_client:string = '';
  mot_de_passe_client:string='';
  
  apiKey = '6CCB108DFD78B21E084DDE46BCEEE16D';
  steamId: any;
  constructor(
    private http:HttpClient,
    private router: Router,
    private authService: AuthService,
    private navCtrl: NavController,
    private iab: InAppBrowser, 
    private storage: Storage
    ) { }

  ngOnInit() {
  }
  connexion(){
    this.data = { email_client: this.email_client, mot_de_passe_client: this.mot_de_passe_client };
    this.authService.connexion(this.data).subscribe();
  }
  loginGmail(){
    console.log("login Gmail")
  }

  loginSteam() {
    console.log('login steam');
  
    const steamOpenIdUrl = `https://steamcommunity.com/openid/login?` +
      `openid.ns=http://specs.openid.net/auth/2.0&` +
      `openid.mode=checkid_setup&` +
      `openid.return_to=${encodeURIComponent('http://localhost:8100')}&` +
      `openid.realm=${encodeURIComponent('http://localhost:8100')}&` +
      `openid.identity=http://specs.openid.net/auth/2.0/identifier_select&` +
      `openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&` +
      `openid.ns.sreg=http://openid.net/extensions/sreg/1.1&` +
      `openid.sreg.required=email,fullname&` +
      `openid.ns.ax=http://openid.net/srv/ax/1.0&` +
      `openid.ax.mode=fetch_request&` +
      `openid.ax.required=steamid&` +
      `openid.ax.type.steamid=http://axschema.org/steam/steamid&` +
      `openid.ax.type.email=http://axschema.org/contact/email&` +
      `openid.ax.type.fullname=http://axschema.org/namePerson&` +
      `openid.ax.type.country=http://axschema.org/contact/country/home`;
  
    const browser = this.iab.create(steamOpenIdUrl, '_blank');
  
    if (browser && browser.on) {
      const loadstart$ = browser.on('loadstart');
      if (loadstart$) {
        loadstart$.subscribe(async (event) => {
          console.log('loadstart event:', event);
          if (event.url.includes('http://localhost:8100/profil')) {
            console.log('URL includes http://localhost:8100/profil');
      
            const params = new URLSearchParams(event.url.split('?')[1]);
            console.log('URL params:', params);
            const steamIdentity = params.get('openid.identity');
            console.log('steamIdentity:', steamIdentity);
            const steamId = steamIdentity ? steamIdentity.split('/id/')[1] : null;
            console.log('steamId:', steamId);
            if (steamId) {
              console.log('SteamId:', steamId);
        
              // Vérifier si le steamId existe déjà dans la base de données
              /*const existingClient = await this.verifySteamId(steamId);
              console.log('existingClient:', existingClient);
              if (existingClient) {
                console.log('L\'identifiant Steam existe déjà dans la base de données');
                return;
              }
        
              // Appeler la fonction pour enregistrer le steamId dans la base de données
              this.enregistrerSteamId(steamId);*/
            }
            browser.close();
          }
        });
      }
    }
  }

  /*loginSteam() {
    console.log('login steam');
  
    const steamOpenIdUrl = `https://steamcommunity.com/openid/login?` +
      `openid.ns=http://specs.openid.net/auth/2.0&` +
      `openid.mode=checkid_setup&` +
      `openid.return_to=${encodeURIComponent('http://localhost:8100/profil')}&` +
      `openid.realm=${encodeURIComponent('http://localhost:8100/profil')}&` +
      `openid.identity=http://specs.openid.net/auth/2.0/identifier_select&` +
      `openid.claimed_id=http://specs.openid.net/auth/2.0/identifier_select&` +
      `openid.ns.sreg=http://openid.net/extensions/sreg/1.1&` +
      `openid.sreg.required=email,fullname&` +
      `openid.ns.ax=http://openid.net/srv/ax/1.0&` +
      `openid.ax.mode=fetch_request&` +
      `openid.ax.required=steamid&` +
      `openid.ax.type.steamid=http://axschema.org/steam/steamid&` +
      `openid.ax.type.email=http://axschema.org/contact/email&` +
      `openid.ax.type.fullname=http://axschema.org/namePerson&` +
      `openid.ax.type.country=http://axschema.org/contact/country/home`;
  
    const browser = this.iab.create(steamOpenIdUrl, '_blank');
  
    if (browser && browser.on) {
      const loadstart$ = browser.on('loadstart');
      if (loadstart$) {
        loadstart$.subscribe(async (event) => {
          if (event.url.includes('http://localhost:8100/profil')) {
            browser.close();
            const params = new URLSearchParams(event.url.split('?')[1]);
            const steamIdentity = params.get('openid.identity');
            const steamId = steamIdentity ? steamIdentity.split('/id/')[1] : null;
            if (steamId) {
              // Vérifier si le steamId existe déjà dans la base de données
              const existingClient = await this.verifySteamId(steamId);
              if (existingClient) {
                console.log('L\'identifiant Steam existe déjà dans la base de données');
                return;
              }
  
              // Appeler la fonction pour enregistrer le steamId dans la base de données
              this.enregistrerSteamId(steamId);
            }
          }
        });
      }
    }
  }*/
  
  /*async verifySteamId(steamId: string): Promise<boolean> {
    try {
      const response = await axios.get(`http://localhost:8080/verifySteamId/clients?steamId=${steamId}`);
      const data = response.data;
      return data.length > 0;
    } catch (error: any) {
      console.error('Erreur lors de la vérification de l\'identifiant Steam', error);
      return false;
    }
  }
  
  async enregistrerSteamId(steamId: string) {
    try {
      await axios.post(`http://localhost:8080/addSteamId/clients`, { steamId });
      console.log('Identifiant Steam enregistré avec succès dans la base de données');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'identifiant Steam dans la base de données', error);
    }
  }*/
  
  getUserSteamInfo(steamId: string) {
    const url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${this.apiKey}&steamids=${steamId}`;

    this.http.get(url).subscribe(
      (response: any) => {
        console.log('Response:', response);
        // Handle the response data as needed
        // You can store the user information in local storage or perform further actions.
        // Handle the response data as needed
        // You can store the user information in local storage or perform further actions.
        this.storage['set']('user', response);
      },
      (error: any) => {
        console.error('Error:', error);
        // Handle the error
      }
    );
  }
  
  loginXbox(){
    console.log("login Xbox")
  }

}
