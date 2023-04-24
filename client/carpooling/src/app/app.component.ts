import { Component } from '@angular/core';
import { UserService, User } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Carpooling';

  users: User[] = []

  constructor(private userService: UserService) { }


  ngOnInit() {
    this.userService.getUserList().subscribe(
      data => {
        this.users = data
        console.log(this.users);
      }
    )
  }
}
