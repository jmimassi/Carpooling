import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItinariesService, Itinaries } from '../../services/itinaries.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modified-my-itinaries',
  templateUrl: './modified-my-itinaries.page.html',
  styleUrls: ['./modified-my-itinaries.page.scss'],
})
export class ModifiedMyItinariesPage implements OnInit {
  itinerary: any;

  constructor(
    private route: ActivatedRoute,
    private itinariesService: ItinariesService,
    private router: Router
  ) { }

  // Fetch data at the start of the component
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      if (encodedData) {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        this.itinerary = decodedData;
      }
    });
  }


  // Submit the edited form
  onSubmitEdit() {
    const itinariesId = this.itinerary.itinaries_id; // ID de l'itinéraire sélectionné

    const updatedItinaries: Itinaries = {
      itinaries_id: itinariesId,
      destination: this.itinerary.destination,
      startAddress: this.itinerary.startAddress,
      seats: this.itinerary.seats,
      startDate: this.itinerary.startDate,
      hours: this.itinerary.hours
    };

    console.log(updatedItinaries);

    this.itinariesService.itinariesUpdate(itinariesId, updatedItinaries).subscribe(
      data => {
        console.log('Itinéraire mis à jour avec succès', data);
        this.router.navigate(['/my-itinaries']);
      },
      error => {
        console.log('Erreur lors de la mise à jour de l\'itinéraire', error);
      }
    );
  }
}
