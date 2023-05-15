import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ItinariesService, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-my-itinaries',
  templateUrl: './my-itinaries.page.html',
  styleUrls: ['./my-itinaries.page.scss']
})
export class MyItinariesPage {
  username: string = '';
  searchTerm: string = '';
  itineraries: ItinariesCard[] = [];
  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    private itinariesService: ItinariesService,
    private router: Router,
    private itinariesUserService: ItinariesUserService,
  ) { }

  ngOnInit() {
    this.itinariesService.itinariesListMyCard().subscribe((data) => {
      this.itineraries = data;
    });

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const decodedToken: any = jwt_decode(token);
    this.username = decodedToken.id;
  }

  updateDetails(itinerary: any) {
    this.selectedItinerary = itinerary;
  }

  cancelItinerary() {
    if (!this.selectedItinerary) {
      console.error('No itinerary selected');
      return;
    }

    const fk_user = this.username; // Get the current logged-in user's ID
    const fk_itinaries = this.selectedItinerary.itinaries_id; // ID of the selected itinerary

    const itinariesId = this.selectedItinerary.itinaries_id;

    this.itinariesUserService.itinariesUserDelete(fk_user, fk_itinaries).subscribe(
      (data) => {
        console.log('Itinerary cancelled successfully', data);
        // Réinitialiser les itinéraires ou effectuer toute autre action nécessaire
        this.itineraries = this.itineraries.filter((itineraries) => itineraries.itinaries_id !== itinariesId);
      },
      (error) => {
        console.error('Error cancelling itinerary', error);
      }
    );
  }

  deleteItinerary() {
    if (!this.selectedItinerary) {
      console.error('No itinerary selected');
      return;
    }

    const itinariesId = this.selectedItinerary.itinaries_id;

    this.itinariesService.itinariesDelete(itinariesId).subscribe(
      (data) => {
        console.log('Itinerary deleted successfully', data);
        // Réinitialiser les itinéraires ou effectuer toute autre action nécessaire
        this.itineraries = this.itineraries.filter((itinerary) => itinerary.itinaries_id !== itinariesId);
      },
      (error) => {
        console.error('Error deleting itinerary', error);
      }
    );
  }

  editItinerary(itinerary: any) {

  }

  Request() {
    // Logique pour la demande d'itinéraire
  }

  requestItinerary() {

  }
}
