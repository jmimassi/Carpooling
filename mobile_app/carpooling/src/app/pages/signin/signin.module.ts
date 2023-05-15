import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { SigninPageRoutingModule } from './signin-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninPage } from './signin.page';
import { UserService } from 'src/app/services/user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SigninPageRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [SigninPage],
  providers: [UserService]
})
export class SigninPageModule { }
