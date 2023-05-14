import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItinariesComponent } from './pages/itinaries/itinaries.component';
import { MyItinariesComponent } from './pages/my-itinaries/my-itinaries.component';
import { PublishItinariesComponent } from './pages/publish-itinaries/publish-itinaries.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RequestComponent } from './pages/request/request.component';


const routes: Routes = [
    { path: '', redirectTo: '/signin', pathMatch: 'full' },
    { path: 'itinaries', component: ItinariesComponent },
    { path: 'publishitinaries', component: PublishItinariesComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'myitinaries', component: MyItinariesComponent },
    { path: 'request', component: RequestComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }