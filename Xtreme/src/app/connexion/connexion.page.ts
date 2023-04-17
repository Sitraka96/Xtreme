import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  pseudo_client:string = '';
  mot_de_passe_client:string='';
  data:any = null;

  constructor(
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
  }
  connexion(){
    this.data = { pseudo_client: this.pseudo_client, mot_de_passe_client: this.mot_de_passe_client };
    this.authService.connexion(this.data).subscribe();
  }

}
