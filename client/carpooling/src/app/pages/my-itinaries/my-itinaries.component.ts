import { Component, ViewChild, TemplateRef } from '@angular/core';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-my-itinaries',
  templateUrl: './my-itinaries.component.html',
  styleUrls: ['./my-itinaries.component.css']
})
export class MyItinariesComponent {


  username: string = '';

  itinaries: ItinariesCard[] = [];

  selectedItinerary: any; // variable qui stockera l'itinéraire sélectionné

  showModal: boolean = false;

  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;

  constructor(private itinariesService: ItinariesService, private router: Router, private itinaries_userService: ItinariesUserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.itinariesService.itinariesListMyCard().subscribe(
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

  searchTerm: string = '';

  deleteItinerary(itinerary: any) {
    // Ne fait rien
  }

  editItinerary(itinerary: any) {
    const dialogRef = this.dialog.open(this.modalContent, {
      // width: '400px', // Définissez la largeur du modal selon vos besoins
      data: { itinerary: itinerary }
    });

    dialogRef.afterClosed().subscribe(result => {
      // Logique à exécuter après la fermeture du modal, si nécessaire
    });
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

    console.log("c'est l'initarie id : ", itinariesId);

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
        // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
      },
      error => {
        // Gestion des erreurs lors de la requête de mise à jour
        console.log('Erreur lors de la mise à jour de l\'itinéraire', error);
      }
    );
  }



}
