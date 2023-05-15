import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublishItinariesPage } from './publish-itinaries.page';

const routes: Routes = [
  {
    path: '',
    component: PublishItinariesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublishItinariesPageRoutingModule {}
