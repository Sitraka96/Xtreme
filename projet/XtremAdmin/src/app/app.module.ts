import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ClientComponent } from './client/client.component';
import { ClassementComponent } from './classement/classement.component';
import { TournoisComponent } from './tournois/tournois.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { LeftSidebarComponent } from './layout/left-sidebar/left-sidebar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';








import { ReqInterceptor } from 'src/app/Services/req.interceptor';

//graphql
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {APOLLO_OPTIONS, Apollo} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { LOCALE_ID } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpXsrfInterceptorService } from './interceptor/http-xsrf-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RetraitComponent } from './retrait/retrait.component';
import { PaiementComponent } from './paiement/paiement.component';
import { GraphQLModule } from './graphql.module';

const host = 'http://localhost:8080';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ClientComponent,
    ClassementComponent,
    TournoisComponent,
    DashboardComponent,
    LayoutComponent,
    HeaderComponent,
    LeftSidebarComponent,
    RetraitComponent,
    PaiementComponent,
  ],
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    GraphQLModule
    



  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
