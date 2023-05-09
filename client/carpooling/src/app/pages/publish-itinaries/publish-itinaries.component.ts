import { Component } from '@angular/core';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-publish-itinaries',
  templateUrl: './publish-itinaries.component.html',
  styleUrls: ['./publish-itinaries.component.css']
})
export class PublishItinariesComponent {

  itinaries: ItinariesCard[] = [];
  itinaries_user: ItinariesUser[] = [];

  constructor(private itinariesService: ItinariesService, private router: Router, private itinaries_userService: ItinariesUserService) { }

  ngOnInit() {
    this.itinariesService.itinariesListFormatted().subscribe(
      data => {
        // console.log(data)
        this.itinaries = data
        console.log("c'est les itiniraire", this.itinaries);
      }
    )
  }

  onSubmit(itinarie_user: {
    destination: string,
    startAddress: string,
    seats: number,
    startDate: string,
    hours: string
  }) {

    this.itinariesService.itinariesCreate(itinarie_user).subscribe(
      data => {
        // localStorage.setItem('token', data.token);
        // form.reset(); // reset the form after successful submission
        this.router.navigate(['/itinaries']); // navigate to dashboard page
      },
      error => {
        console.log(error);
      }
    );
    console.log('users que je vois dans le signup component', itinarie_user)
  }

  //   onSubmit() {
  //     this.router.navigate(['/signin']); // navigate to dashboard page
  //   }
  // }
}