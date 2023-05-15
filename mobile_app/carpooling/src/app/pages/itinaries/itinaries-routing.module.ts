import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItinariesPage } from './itinaries.page';

const routes: Routes = [
  {
    path: '',
    component: ItinariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItinariesPageRoutingModule {}
