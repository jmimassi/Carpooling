import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';
import { concatMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-itinaries',
  templateUrl: './itinaries.component.html',
  styleUrls: ['./itinaries.component.css']
})
export class ItinariesComponent {

  username: string = '';

  searchTerm: string = '';

  itinaries: ItinariesCard[] = [];

  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(private itinariesService: ItinariesService, private router: Router, private itinariesUserService: ItinariesUserService, private dialog: MatDialog, private snackBar: MatSnackBar) { }


  ngOnInit() {
    this.itinariesService.itinariesListCard().subscribe(
      data => {
        // console.log(data)
        this.itinaries = data
        console.log("c'est les itiniraire", this.itinaries);
      }
    )

    const token = localStorage.getItem('token');
    if (!token) {
      // handle case where token is not present
      console.error('Token not found in localStorage');
      return;
    }

    const decodedToken: any = jwt_decode(token);
    this.username = decodedToken.id;
  }

  updateDetails(itinerary: any) {
    this.selectedItinerary = itinerary;
  }

  onSubmit() {
    this.router.navigate(['/signin']); // navigate to dashboard page
  }

  climbBoardModal(itinerary: any) {
    if (itinerary.passengerEmails.includes(this.username)) {
      this.snackBar.open('You are already a passenger on this itinerary.', 'Close', {
        duration: 3000,
        panelClass: 'error-snackbar' // Apply a custom CSS class for styling the snackbar
      });
      return;
    } else {
      const dialogRef = this.dialog.open(this.modalContent, {
        // width: '400px', // Définissez la largeur du modal selon vos besoins
        data: { itinerary: itinerary }
      });

      dialogRef.afterClosed().subscribe(result => {
        // Logique à exécuter après la fermeture du modal, si nécessaire
      })
    };
  }

  onSubmitClimb(itinarie: ItinariesUser) {
    const itinariesId = this.selectedItinerary.itinaries_id; // ID de l'itinéraire sélectionné

    console.log("c'est l'itineraire id : ", itinariesId);
    console.log("c'est l'itinéraire où on veut aller", itinarie);

    const updatedItinaries: ItinariesUser = {
      type_user: "passenger",
      request_user: 0,
      message: itinarie.message,
      fk_user: this.username,
      fk_itinaries: itinariesId
    };

    console.log(updatedItinaries);

    this.itinariesUserService.itinariesUserCreate(updatedItinaries).subscribe(
      data => {
        // Gestion de la réponse de la requête de création
        console.log('Itinéraire créé avec succès', data);
        // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
      },
      error => {
        // Gestion des erreurs lors de la requête de création
        console.log('Erreur lors de la création de l\'itinéraire', error);
      }
    );
  }








}

