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

  itinaries: ItinariesCard[] = [];

  selectedItinerary: any;

  showModal: boolean = false;

  searchTerm: string = '';

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;
  dialogRef!: MatDialogRef<any>;

  constructor(
    private itinariesService: ItinariesService,
    private router: Router,
    private itinaries_userService: ItinariesUserService,
    private dialog: MatDialog
  ) { }

  // Fetch the itinaries on component initialization
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

  // update the right side of the screen when we click on an itinarie card
  updateDetails(itinerary: any) {
    this.selectedItinerary = itinerary;
  }

  // Delete an itinerary as a conductor
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

  // Open the modal to edit the itinerary as a conductor
  editItinerary(itinerary: any) {
    this.dialogRef = this.dialog.open(this.modalContent, {
      data: { itinerary: itinerary }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

  // Open the page of the passenger that want to climb on board with us as a conductor
  Request() {
    if (!this.selectedItinerary) {
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

  // Cancel a booking as a passenger
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

  // Submit the edited card
  onSubmitEdit(itinarie: {
    id: number,
    destination: string,
    startAddress: string,
    seats: number,
    startDate: string,
    hours: string
  }) {
    const itinariesId = this.selectedItinerary.itinaries_id;

    console.log(itinariesId);

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
        console.log('Itinéraire mis à jour avec succès', data);
        this.dialogRef.close(); // Close the modal after submitting the form
      },
      error => {
        console.log('Erreur lors de la mise à jour de l\'itinéraire', error);
      }
    );
  }
}
