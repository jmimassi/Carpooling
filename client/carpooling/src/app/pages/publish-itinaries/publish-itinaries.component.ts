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
  selectedTime: any;

  constructor(private itinariesService: ItinariesService, private router: Router) { }

  // Fetch the itinaries on component initialization
  ngOnInit() {
    this.itinariesService.itinariesListFormatted().subscribe(
      data => {
        // console.log(data)
        this.itinaries = data
        console.log("c'est les itiniraire", this.itinaries);
      }
    )
  }

  // Create a new itinerary
  onSubmit(itinarie: {
    destination: string,
    startAddress: string,
    seats: number,
    startDate: string,
    hours: string
  }) {
    // Extract the date portion from the startDate string
    const startDate = new Date(itinarie.startDate).toISOString().substring(0, 10);

    // Update the itinarie_user object with the formatted startDate
    const updatedItinarie = { ...itinarie, startDate };

    this.itinariesService.itinariesCreate(updatedItinarie).subscribe(
      data => {
        this.router.navigate(['/itinaries']); // navigate to dashboard page
      },
      error => {
        console.log(error);
      }
    );

    console.log('users que je vois dans le signup component', updatedItinarie);
  }
}
