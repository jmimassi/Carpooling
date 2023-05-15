import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  onSubmit(users: { email: string; password: string, address: string, lisence_plate: string, picture: string }) {
    this.userService.userCreate(users).subscribe(
      data => {
        // localStorage.setItem('token', data.token);
        // form.reset(); // reset the form after successful submission
        this.router.navigate(['/signin']); // navigate to dashboard page
      },
      error => {
        console.log(error);
      }
    );
    console.log('users que je vois dans le signup component', users)
  }

  ngOnInit() {
    this.userService.UserList().subscribe(
      data => {
        this.users = data
        console.log(this.users);
      }
    )
  }


}