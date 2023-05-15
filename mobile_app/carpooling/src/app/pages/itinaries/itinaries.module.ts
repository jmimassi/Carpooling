import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ItinariesPageRoutingModule } from './itinaries-routing.module';
import { ItinariesService } from 'src/app/services/itinaries.service';
import { ItinariesPage } from './itinaries.page';
import { UserService } from 'src/app/services/user.service';
import { ItinariesUserService, ItinariesUser } from 'src/app/services/itinarie-user.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItinariesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ItinariesPage],
  providers: [ItinariesService, UserService, ItinariesUserService]
})
export class ItinariesPageModule { }
