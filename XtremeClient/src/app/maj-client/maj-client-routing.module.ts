import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MajClientPage } from './maj-client.page';

const routes: Routes = [
  {
    path: '',
    component: MajClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MajClientPageRoutingModule {}
