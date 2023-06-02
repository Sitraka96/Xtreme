import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../Services/local-storage.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordHidden = true;
  isLoading = false;
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  constructor(
    private apiService: ApiService,
    private router: Router,
    private ls: LocalStorageService,
    private snackBar: MatSnackBar
  ) { }

  login() {
    this.isLoading = true; // start loading animation
  
    const email = this.emailControl.value;
    const password = this.passwordControl.value;
  
    if (email !== null && password !== null) {
      this.apiService.login(email, password).subscribe(
        (result: any) => {
          this.isLoading = false; // stop loading animation
          if (result.success) {
            this.router.navigateByUrl('/dashboard');
            const config = new MatSnackBarConfig();
            config.panelClass = ['snackbar-success'];
            config.duration = 3000;
            this.snackBar.open('Connexion réussie !', 'Fermer', config);
          } else {
            const config = new MatSnackBarConfig();
            config.panelClass = ['snackbar-error'];
            config.duration = 3000;
            this.snackBar.open('Adresse e-mail ou mot de passe incorrect.', 'Fermer', config);
          }
        },
        (error) => {
          this.isLoading = false; // stop loading animation
          const config = new MatSnackBarConfig();
          config.panelClass = ['snackbar-error'];
          config.duration = 3000;
          this.snackBar.open('Une erreur s\'est produite lors de la connexion.', 'Fermer', config);
        }
      );
    } else {
      // Handle the case when email or password is null
      const config = new MatSnackBarConfig();
      config.panelClass = ['snackbar-error'];
      config.duration = 3000;
      this.snackBar.open('Veuillez saisir une adresse e-mail et un mot de passe.', 'Fermer', config);
    }
  }

  getErrorMessageEmail() {
    if (this.emailControl.hasError('required')) {
      return 'Email obligatoire';
    }
    return this.emailControl.hasError('email') ? 'Email invalide' : '';
  }

  getErrorMessagePassword() {
    if (this.passwordControl.hasError('required')) {
      return 'Mot de passe obligatoire';
    }
    return '';
  }
  togglePasswordVisibility() {
    this.passwordHidden = !this.passwordHidden;
  }
}
