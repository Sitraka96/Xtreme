import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {Storage } from '@ionic/storage';
import {IonicStorageModule} from '@ionic/storage-angular';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

export function jwtOptionsFactory(storage:any){
  return{
    tokenGetter : ()=>{
      return storage.get('access_token')
    },
    whitelistedDomains : ['localhost://8080']
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider:{
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage]
      }
    })
  ],
  providers: [
    Platform,
    StatusBar,
    SplashScreen,
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
