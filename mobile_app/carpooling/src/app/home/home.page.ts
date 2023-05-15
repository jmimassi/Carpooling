import { Component } from '@angular/core';
import { UserService, User } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private userService: UserService) { }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
    // console.log(localStorage.getItem('token')); // Vérifier la valeur du token
    this.userService.UserList().subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
  }


}
