import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  constructor(private userService: UserService) { }

  onSubmit(users: { email: string; password: string, address: string, number_passengers_max: number, lisence_plate: string, picture: string }) {
    this.userService.userCreate(users).subscribe(
      data => localStorage.setItem('token', data.token)
    )
    console.log('users que je vois dans le signup component', users)
  }
}