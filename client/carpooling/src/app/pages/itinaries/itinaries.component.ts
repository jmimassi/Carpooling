import { Component } from '@angular/core';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-itinaries',
  templateUrl: './itinaries.component.html',
  styleUrls: ['./itinaries.component.css']
})
export class ItinariesComponent {

  searchTerm: string = '';

  itinaries: ItinariesCard[] = [];

  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné

  constructor(private itinariesService: ItinariesService, private router: Router) { }

  ngOnInit() {
    this.itinariesService.itinariesListFormatted().subscribe(
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

  onSubmit() {
    this.router.navigate(['/signin']); // navigate to dashboard page
  }



}

