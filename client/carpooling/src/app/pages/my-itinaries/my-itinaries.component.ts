import { Component } from '@angular/core';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-itinaries',
  templateUrl: './my-itinaries.component.html',
  styleUrls: ['./my-itinaries.component.css']
})
export class MyItinariesComponent {

  itinaries: ItinariesCard[] = [];

  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné

  constructor(private itinariesService: ItinariesService, private router: Router, private itinaries_userService: ItinariesUserService) { }

  ngOnInit() {
    this.itinariesService.itinariesListMyCard().subscribe(
      data => {
        // console.log(data)
        this.itinaries = data
        console.log("c'est les itiniraire", this.itinaries);
      }
    )
  }

  updateDetails(itinerary: any) {
    this.selectedItinerary = itinerary;
  }

}
