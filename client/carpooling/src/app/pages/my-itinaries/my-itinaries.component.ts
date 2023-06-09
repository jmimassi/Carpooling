import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { concatMap } from 'rxjs/operators';


@Component({
  selector: 'app-my-itinaries',
  templateUrl: './my-itinaries.component.html',
  styleUrls: ['./my-itinaries.component.css']
})
export class MyItinariesComponent {

  username: string = '';

  passengersData: any;

  public requestItinaries: any[] = [];

  itinaries: ItinariesCard[] = [];

  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné

  passengers: ItinariesUser[] = [];

  showModal: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private itinariesService: ItinariesService,
    private router: Router,
    private itinaries_userService: ItinariesUserService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchData(); // Fetch the data when the component initializes
  }

  fetchData() {
    this.itinariesService.itinariesListMyCard().subscribe(
      (data) => {
        this.itinaries = data;
        console.log("These are the itineraries", this.itinaries);
      }
    );

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

  searchTerm: string = '';

  deleteItinerary() {
    const itinariesId = this.selectedItinerary.itinaries_id; // ID of the selected itinerary
    console.log(itinariesId);
    this.itinariesService.itinariesDelete(itinariesId).subscribe(
      (data) => {
        this.itinaries = data;
        console.log("Itinerary deleted", this.itinaries);
        this.fetchData(); // Fetch the updated data after successful deletion
        this.selectedItinerary = null; // Set selectedItinerary to null
      }
    );
  }

  editItinerary(itinerary: any) {
    this.dialogRef = this.dialog.open(this.modalContent, {
      // width: '400px', // Définissez la largeur du modal selon vos besoins
      data: { itinerary: itinerary }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
      // Logique à exécuter après la fermeture du modal, si nécessaire
    });
  }

  Request() {
    if (!this.selectedItinerary) {
      // Vérifiez si un itinéraire est sélectionné avant de continuer
      console.error('No itinerary selected');
      return;
    }

    const itinerariesId = this.selectedItinerary.itinaries_id;

    this.itinariesService.itinariesListPassenger(itinerariesId).subscribe(
      data => {
        this.itinaries = data;

        const encodedData = encodeURIComponent(JSON.stringify(this.itinaries));

        this.router.navigate(['/request'], { queryParams: { data: encodedData } });
      }
    );
  }


  cancelItinerary() {
    const fk_user = this.username; // Get the current logged-in user's ID
    const fk_itinaries = this.selectedItinerary.itinaries_id; // ID of the selected itinerary

    this.itinaries_userService.itinariesUserDelete(fk_user, fk_itinaries).subscribe(
      (data) => {
        console.log('Itinerary booking deleted successfully', data);
        this.fetchData(); // Fetch the updated data after successfully deleting the itinerary booking
        this.selectedItinerary = null; // Set selectedItinerary to null
      },
      (error) => {
        console.log('Error deleting itinerary booking', error);
      }
    );
  }

  onSubmitEdit(itinarie: {
    id: number,
    destination: string,
    startAddress: string,
    seats: number,
    startDate: string,
    hours: string
  }) {
    const itinariesId = this.selectedItinerary.itinaries_id; // ID de l'itinéraire sélectionné

    console.log("c'est l'itineraire id : ", itinariesId);

    const updatedItinaries: Itinaries = {
      itinaries_id: itinariesId,
      destination: itinarie.destination,
      startAddress: itinarie.startAddress,
      seats: itinarie.seats,
      startDate: itinarie.startAddress,
      hours: itinarie.hours
    };

    console.log(updatedItinaries)

    this.itinariesService.itinariesUpdate(itinariesId, updatedItinaries).subscribe(
      data => {
        // Gestion de la réponse de la requête de mise à jour
        console.log('Itinéraire mis à jour avec succès', data);
        this.dialogRef.close(); // Close the modal after submitting the form
        // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
      },
      error => {
        // Gestion des erreurs lors de la requête de mise à jour
        console.log('Erreur lors de la mise à jour de l\'itinéraire', error);
      }
    );
  }
}
