import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublishItinariesPageRoutingModule } from './publish-itinaries-routing.module';

import { PublishItinariesPage } from './publish-itinaries.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishItinariesPageRoutingModule
  ],
  declarations: [PublishItinariesPage]
})
export class PublishItinariesPageModule {}
