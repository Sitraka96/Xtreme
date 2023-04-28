import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {
  nom_client:string='';
  prenom_client:string='';
  pseudo_client:string='';
  email_client:string='';
  mot_de_passe_client:string='';
  confirme_mdp:string='';
  data:any = null;
  datalog:any = null;

  constructor(private http:HttpClient, private router: Router, private authService: AuthService) { }

  ngOnInit() {}

  onRegister(){
    this.data = {
      'nom_client':this.nom_client,
      'prenom_client':this.prenom_client,
      'pseudo_client':this.pseudo_client,
      'email_client':this.email_client,
      'mot_de_passe_client': this.mot_de_passe_client
    }
    this.datalog = {
      'pseudo_client':this.pseudo_client,
      'mot_de_passe_client': this.mot_de_passe_client
    }
    if(this.mot_de_passe_client === this.confirme_mdp){
      this.authService.inscription(this.data).subscribe(res =>{
        this.authService.connexion(this.datalog).subscribe();
      });
    }
    else{
      this.authService.showAlert('les deux mots de passe ne correspond pas')
    }
  }

}
