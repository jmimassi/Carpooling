import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModifiedMyItinariesPage } from './modified-my-itinaries.page';

const routes: Routes = [
  {
    path: '',
    component: ModifiedMyItinariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModifiedMyItinariesPageRoutingModule {}
