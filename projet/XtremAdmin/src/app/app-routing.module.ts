import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { ClassementComponent } from './classement/classement.component';
import { TournoisComponent } from './tournois/tournois.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuard } from "src/app/Services/login.guard";
import { AuthGuard } from "src/app/Services/auth.guard";
import { RetraitComponent } from './retrait/retrait.component';
import { PaiementComponent } from './paiement/paiement.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: 'client', canActivate: [AuthGuard], component: ClientComponent },
  { path: 'paiement', canActivate: [AuthGuard], component: PaiementComponent },
  { path: 'retrait', canActivate: [AuthGuard], component: RetraitComponent },
  { path: 'dashboard', canActivate: [AuthGuard],component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
