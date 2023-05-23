import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MajClientPageRoutingModule } from './maj-client-routing.module';

import { MajClientPage } from './maj-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MajClientPageRoutingModule
  ],
  declarations: [MajClientPage]
})
export class MajClientPageModule {}
