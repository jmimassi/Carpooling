import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyItinariesPageRoutingModule } from './my-itinaries-routing.module';

import { MyItinariesPage } from './my-itinaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyItinariesPageRoutingModule
  ],
  declarations: [MyItinariesPage]
})
export class MyItinariesPageModule {}
