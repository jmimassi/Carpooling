import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'itinaries',
    loadChildren: () => import('./pages/itinaries/itinaries.module').then(m => m.ItinariesPageModule)
  },
  {
    path: 'my-itinaries',
    loadChildren: () => import('./pages/my-itinaries/my-itinaries.module').then(m => m.MyItinariesPageModule)
  },
  {
    path: 'publish-itinaries',
    loadChildren: () => import('./pages/publish-itinaries/publish-itinaries.module').then(m => m.PublishItinariesPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('./pages/signin/signin.module').then(m => m.SigninPageModule)
  },
  {
    path: 'request',
    loadChildren: () => import('./pages/request/request.module').then(m => m.RequestPageModule)
  },
  {
    path: 'climb-on-board',
    loadChildren: () => import('./pages/climb-on-board/climb-on-board.module').then( m => m.ClimbOnBoardPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
