import { Component, OnInit, ViewChild } from '@angular/core';
import { ItinariesService, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { concatMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-itinaries',
  templateUrl: './itinaries.page.html',
  styleUrls: ['./itinaries.page.scss']
})
export class ItinariesPage {
  username: string = '';
  searchTerm: string = '';
  itinaries: ItinariesCard[] = [];
  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné
  // @ViewChild(ItinariesService) private itinariesService!: ItinariesService;

  @ViewChild('modalContent') modalContent: any;

  constructor(
    // private itinariesService: ItinariesService,
    private router: Router,
    private itinariesUserService: ItinariesUserService,
    private toastController: ToastController,
    private modalController: ModalController,
    private itinariesService: ItinariesService
  ) { }

  ionViewWillEnter() {
    this.itinariesService.itinariesListFormatted().subscribe((data) => {
      this.itinaries = data;
      console.log("C'est les itinéraires", this.itinaries);
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

  climbBoardModal(itinerary: any) {
    this.selectedItinerary = itinerary;
    const encodedData = encodeURIComponent(JSON.stringify(this.selectedItinerary));
    console.log(this.selectedItinerary)
    this.router.navigate(['/climb-on-board'], { queryParams: { data: encodedData } });
  }

  filterItineraries() {
    if (!this.searchTerm) {
      return this.itinaries;
    }

    const searchTermLower = this.searchTerm.toLowerCase();

    return this.itinaries.filter(itinerary => {
      return (
        itinerary.destination.toLowerCase().includes(searchTermLower)
      );
    });
  }

}
