import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private userService: UserService) { }

  onSubmit(users: { email: string; password: string }) {
    this.userService.userLogin(users).subscribe(
      data => localStorage.setItem('token', data.token)
    )
    console.log('users que je vois dans le signin component', users)
  }

  onClick() {
    this.userService.userLogout().subscribe(
    )
    console.log('users que je vois dans le signin component')
  }

}