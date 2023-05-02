import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  users: User[] = []
  emailFormControl: any;

  constructor(private userService: UserService) { }

  login() {
    this.userService.userCreate().subscribe(
      data => localStorage.setItem('token', data.token)
    )
  }
}