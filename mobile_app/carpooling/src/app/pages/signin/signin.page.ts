import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})

export class SigninPage {
  signinForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.signinForm = new FormGroup({
      'email': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, Validators.required),
    });
  }

  // Login with an existing user
  onSubmit() {
    if (this.signinForm.valid) {
      this.userService.userLogin(this.signinForm.value).subscribe(
        data => {
          localStorage.setItem('token', data.token);
          this.router.navigate(['/itinaries']); // navigate to dashboard page
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  // Logout by removing the token from the localStorage
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/signup']); // navigate to dashboard page
  }
}
