import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItinariesPageRoutingModule } from './itinaries-routing.module';

import { ItinariesPage } from './itinaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItinariesPageRoutingModule
  ],
  declarations: [ItinariesPage]
})
export class ItinariesPageModule {}
