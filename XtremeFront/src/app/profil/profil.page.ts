import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
  /*userApiUrl = 'http://localhost:8080/profil';
  myData = {
    nom_client: '',
    prenom_client: '',
    pseudo_client: ''
  };*/
  private apiUrl = 'http://localhost:8080/profil';
  nom_client: any;
  prenom_client:any;
  pseudo_client:any;
  myData:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
		private storage: Storage,
		private toastController: ToastController
  ) { }

  /*readAPI(URL: string) {
    return this.http.get(URL);
  }
  constructor(
    private http: HttpClient,
    private authService: AuthService,
		private storage: Storage,
		private toastController: ToastController
  ) {
    this.readAPI(this.userApiUrl)
      .subscribe((data) => {
      console.log("reto le info an le user", data);
      this.userData.nom_client = data['nom_client'];
      this.userData.prenom_client = data['prenom_client'];
      this.userData.pseudo_client = data['pseudo_client'];
    });
  }*/

 ngOnInit() {
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
  /*this.movieApiUrl = 'http://localhost:8080/profil';
  this.readAPI(this.movieApiUrl)
    .subscribe((data) => {
    console.log(data);
    this.movieData.title = data['Title'];
    this.movieData.description = data['Plot'];
    this.movieData.imageUrl = data['Poster'];
  });*/
  ionViewDidEnter() {
    this.myData = {
      nom: this.nom_client,
      prenom: this.nom_client,
      pseudo: this.nom_client
    };
    this.http.get(this.apiUrl).subscribe((data: any) => {
      console.log("reto le izy e", data); 
      this.myData = data;
    });
  }
}
