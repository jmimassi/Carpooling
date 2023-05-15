import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService, User } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})

export class SignupPage {
  users: User[] = [];
  signupForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      'address': new FormControl(null, Validators.required),
      'lisence_plate': new FormControl(null, Validators.required),
      'picture': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.userService.userCreate(this.signupForm.value).subscribe(
        data => {
          console.log(data);
          // localStorage.setItem('token', data.token);
          this.router.navigate(['/signin']); // navigate to dashboard page
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}