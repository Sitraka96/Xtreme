import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
	[x: string]: any;
	activePageTitle = 'Profile';
	Pages = [
		{
			title: 'Info',
			url: '',
			icon: 'information'
		},
		{
			title: 'Mise à jour',
			url: '',
			icon: 'create'
		},
		{
			title: 'Déconnexion',
			click: () => {
			  this.authService.logout().subscribe(() => {
				this.navigateToRoute('home	²');
			  });
			},
			icon: 'log-out'
		  }
	];
activeIndex: any;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeApp();
  }

	initializeApp() {
		this.platform.ready().then(() => {
		this.statusBar.styleDefault();
		this.splashScreen.hide();
		this.authService.authenticationState.subscribe((state) => {
			if (state) {
			this.router.navigateByUrl('/profil');
			} else {
			this.router.navigateByUrl('/connexion');
			}
		});
		});
	}
	navigateToRoute(route: string) {
		console.log('Navigating to route:', route);
		this.router.navigateByUrl(route);
	  }
}
