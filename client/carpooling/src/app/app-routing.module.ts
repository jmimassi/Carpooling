import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItinariesComponent } from './components/itinaries/itinaries.component';
import { MyItinariesComponent } from './components/my-itinaries/my-itinaries.component';
import { PublishItinariesComponent } from './components/publish-itinaries/publish-itinaries.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component'


const routes: Routes = [
    { path: 'itinaries', component: ItinariesComponent },
    { path: 'publishitinaries', component: PublishItinariesComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'myitinaries', component: MyItinariesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }