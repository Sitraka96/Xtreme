import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

   isLoading = false;
  loggingOut = false;
  private readonly LOGOUT_DELAY = 3000; // 20 secondes

  constructor(
    private api: ApiService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.isLoading = true;
    this.loggingOut = true;
    setTimeout(() => {
      this.api.logout().subscribe(() => {
        this.api.clearAuth(); // supprimer le token et réinitialiser l'authentification
        this.router.navigateByUrl('/login');
        this.toastr.success('Déconnexion', 'Message');
        this.isLoading = false;
      }, (error) => {
        console.log(error);
        this.toastr.error('Une erreur est survenue lors de la déconnexion', 'Erreur');
        this.isLoading = false;
      });
    }, this.LOGOUT_DELAY);
  }
}
