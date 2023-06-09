import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ItinariesService, ItinariesCard, Itinaries } from '../../services/itinaries.service';
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
  itinaries: any[] = [];
  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné
  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(
    private itinariesService: ItinariesService,
    private router: Router,
    private itinariesUserService: ItinariesUserService,
  ) { }

  ionViewWillEnter() {
    this.itinariesService.itinariesListMyCard().subscribe((data) => {
      this.itineraries = data;
      console.log(this.itineraries)
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

    const updatedItinerary: Itinaries = {
      itinaries_id: this.selectedItinerary.itinaries_id,
      destination: this.selectedItinerary.destination,
      startAddress: this.selectedItinerary.startAddress,
      seats: this.selectedItinerary.seats,
      startDate: this.selectedItinerary.startDate,
      hours: this.selectedItinerary.hours
    };

    this.itinariesService.itinariesUpdate(updatedItinerary.itinaries_id, updatedItinerary)
      .subscribe(
        (data) => {
          console.log('Itinerary updated successfully', data);
        },
        (error) => {
          console.error('Error updating itinerary', error);
        }
      );
  }


  cancelItinerary(itinerary: any) {
    this.selectedItinerary = itinerary;
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

  deleteItinerary(itinerary: any) {
    this.selectedItinerary = itinerary;
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
    this.selectedItinerary = itinerary;
    console.log(this.selectedItinerary)
    const encodedData = encodeURIComponent(JSON.stringify(this.selectedItinerary));
    this.router.navigate(['/modified-my-itinaries'], { queryParams: { data: encodedData } });
  }

  requestItinerary(itinerary: any) {
    this.selectedItinerary = itinerary;
    const itinariesId = this.selectedItinerary.itinaries_id;
    console.log(itinariesId);

    this.itinariesService.itinariesListPassenger(itinariesId).subscribe(
      data => {
        console.log(data);
        if (data) {
          this.itinaries = data;
        } else {
          this.itinaries = [];
        }
        const encodedData = encodeURIComponent(JSON.stringify(this.itinaries));
        this.router.navigate(['/request'], { queryParams: { data: encodedData } });
      },
      error => {
        console.error('Erreur lors de la récupération des passagers', error);
      }
    );
  }


  filterItineraries() {
    if (!this.searchTerm) {
      return this.itineraries;
    }

    const searchTermLower = this.searchTerm.toLowerCase();

    return this.itineraries.filter(itineraries => {
      return (
        itineraries.destination.toLowerCase().includes(searchTermLower)
      );
    });
  }

}
