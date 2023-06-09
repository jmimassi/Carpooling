import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { PublishItinariesPageRoutingModule } from './publish-itinaries-routing.module';

import { PublishItinariesPage } from './publish-itinaries.page';
import { UserService } from 'src/app/services/user.service';
import { ItinariesUserService, ItinariesUser } from 'src/app/services/itinarie-user.service';
import { ItinariesService } from 'src/app/services/itinaries.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublishItinariesPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [PublishItinariesPage],
  providers: [ItinariesService, UserService, ItinariesUserService]
})
export class PublishItinariesPageModule { }
