import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(users: { email: string; password: string }) {
    this.userService.userLogin(users).subscribe(
      data => localStorage.setItem('token', data.token)
    )
    this.router.navigate(['/itinaries']); // navigate to dashboard page
    console.log('users que je vois dans le signin component', users)
  }

  onClick() {
    localStorage.removeItem('token');
    this.router.navigate(['/signup']); // navigate to dashboard page
  }
}