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
  photo_profil:string="";
  data:any = null;
  datalog:any = null;
  imageSrc!:string | ArrayBuffer;
  avatarSelected = false;

  constructor(
    private http:HttpClient, 
    private router: Router, 
    private authService: AuthService,
    ) { }

  ngOnInit() {}

  onRegister(){
    this.data = {
      'nom_client':this.nom_client,
      'prenom_client':this.prenom_client,
      'pseudo_client':this.pseudo_client,
      'email_client':this.email_client,
      'mot_de_passe_client': this.mot_de_passe_client,
      'photo_profil':this.imageSrc || ''
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

  onFileSelected(event: any) {
    const fileInput = event.target;
    const file = fileInput.files[0];
    console.log(file);
  
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string" || e.target?.result instanceof ArrayBuffer) {
          this.imageSrc = e.target.result;
        }
      };
      reader.readAsDataURL(file);
      this.avatarSelected = true; 
    }
  }
}