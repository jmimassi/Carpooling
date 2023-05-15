import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClimbOnBoardPage } from './climb-on-board.page';

const routes: Routes = [
  {
    path: '',
    component: ClimbOnBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClimbOnBoardPageRoutingModule {}
