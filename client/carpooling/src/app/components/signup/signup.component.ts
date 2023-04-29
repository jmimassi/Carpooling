import { Component } from '@angular/core';
import { UserService, User } from '../../services/user.service';
// import { UserService, User } from './../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  users: User[]= []

  constructor( private userService : UserService) {}


  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data
      console.log(this.users);
      }
  )
  }
}