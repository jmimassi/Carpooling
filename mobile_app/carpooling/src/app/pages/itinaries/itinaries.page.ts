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
export class ItinariesPage implements OnInit {
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

  ngOnInit() {
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

  // onSubmit() {
  //   this.router.navigate(['/signin']); // navigate to dashboard page
  // }

  // async climbBoardModal(itinerary: any) {
  //   if (itinerary.passengerEmails.includes(this.username)) {
  //     const toast = await this.toastController.create({
  //       message: 'You are already a passenger on this itinerary.',
  //       duration: 3000,
  //       color: 'danger'
  //     });
  //     toast.present();
  //     return;
  //   }

  //   const modal = await this.modalController.create({
  //     component: this.modalContent,
  //     componentProps: {
  //       itinerary: itinerary
  //     },
  //     cssClass: 'my-custom-modal-class' // Ajoutez des classes CSS personnalisées si nécessaire
  //   });

  //   await modal.present();

  //   const { data } = await modal.onWillDismiss();
  //   if (data) {
  //     // Traitez les données renvoyées par la modal si nécessaire
  //   }
  // }


  // onSubmitClimb(itinarie: ItinariesUser) {
  //   const itinariesId = this.selectedItinerary.itinaries_id; // ID de l'itinéraire sélectionné

  //   console.log("C'est l'itinéraire id : ", itinariesId);
  //   console.log("C'est l'itinéraire où on veut aller", itinarie);

  //   const updatedItinaries: ItinariesUser = {
  //     type_user: "passenger",
  //     request_user: 0,
  //     message: itinarie.message,
  //     fk_user: this.username,
  //     fk_itinaries: itinariesId
  //   };

  //   console.log(updatedItinaries);

  //   this.itinariesUserService.itinariesUserCreate(updatedItinaries).subscribe(
  //     data => {
  //       // Gestion de la réponse de la requête de création
  //       console.log('Itinéraire créé avec succès', data);
  //       //
  //       // Réinitialisez le formulaire ou effectuez toute autre action nécessaire
  //     },
  //     error => {
  //       // Gestion des erreurs lors de la requête de création
  //       console.log("Erreur lors de la création de l'itinéraire", error);
  //     }
  //   );
  // }

  climbBoardModal() {

  }
}