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

  myData:any;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
		private storage: Storage,
		private toastController: ToastController
  ) { }

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
  // ionViewWillEnter() {

  //   this.http.get('http://localhost:8080/profil').subscribe(data => {
  //     this.myData = data;
  //     console.log(this.myData);
  //   });
  // }
}
