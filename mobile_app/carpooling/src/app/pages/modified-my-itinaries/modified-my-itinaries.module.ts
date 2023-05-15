import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModifiedMyItinariesPageRoutingModule } from './modified-my-itinaries-routing.module';

import { ModifiedMyItinariesPage } from './modified-my-itinaries.page';
import { UserService } from 'src/app/services/user.service';
import { ItinariesUserService, ItinariesUser } from 'src/app/services/itinarie-user.service';
import { HttpClientModule } from '@angular/common/http';
import { ItinariesService } from 'src/app/services/itinaries.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModifiedMyItinariesPageRoutingModule,
    HttpClientModule
  ],
  declarations: [ModifiedMyItinariesPage],
  providers: [ItinariesService, UserService, ItinariesUserService]
})
export class ModifiedMyItinariesPageModule { }
