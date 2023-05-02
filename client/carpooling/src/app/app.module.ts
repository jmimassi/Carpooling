import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ItinariesComponent } from './pages/itinaries/itinaries.component';
import { PublishItinariesComponent } from './pages/publish-itinaries/publish-itinaries.component';
import { MyItinariesComponent } from './pages/my-itinaries/my-itinaries.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TopbarComponent } from './components/topbar-menu/topbar.component';
import { TopbarEmptyComponent } from './components/topbar-empty/topbar-empty.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    ItinariesComponent,
    PublishItinariesComponent,
    MyItinariesComponent,
    TopbarComponent,
    TopbarEmptyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }