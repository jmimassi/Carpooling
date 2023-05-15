import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyItinariesPage } from './my-itinaries.page';

const routes: Routes = [
  {
    path: '',
    component: MyItinariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyItinariesPageRoutingModule {}
