import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItinariesPage } from './itinaries.page';
import { ClimbOnBoardPage } from '../climb-on-board/climb-on-board.page';

const routes: Routes = [
  {
    path: '',
    component: ItinariesPage
  },
  {
    path: 'climb-on-board',
    component: ClimbOnBoardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItinariesPageRoutingModule { }
