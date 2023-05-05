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
  email_client:string = '';
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
    this.data = { email_client: this.email_client, mot_de_passe_client: this.mot_de_passe_client };
    this.authService.connexion(this.data).subscribe();
  }

}
