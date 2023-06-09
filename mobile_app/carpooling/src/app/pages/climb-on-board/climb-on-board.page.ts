import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';

@Component({
  selector: 'app-climb-on-board',
  templateUrl: './climb-on-board.page.html',
  styleUrls: ['./climb-on-board.page.scss'],
})
export class ClimbOnBoardPage {
  itinerary: any;
  message: any;
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private itinariesUserService: ItinariesUserService
  ) { }

  // Fetch data at the start of the component
  ionViewWillEnter() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return;
    }

    const decodedToken: any = jwt_decode(token);
    this.username = decodedToken.id;

    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      if (encodedData) {
        const decodedData = JSON.parse(decodeURIComponent(encodedData));
        console.log(decodedData);
        this.itinerary = decodedData;
      }
    });
  }

  // Send message to the conductor
  onSubmit() {
    const itinariesId = this.itinerary.itinaries_id;

    const updatedItinaries: ItinariesUser = {
      type_user: 'passenger',
      request_user: 0,
      message: this.message,
      fk_user: this.username,
      fk_itinaries: itinariesId
    };

    console.log(updatedItinaries);

    this.itinariesUserService.itinariesUserCreate(updatedItinaries).subscribe(
      data => {
        console.log('Itinéraire créé avec succès', data);

        // Naviguer vers la page de l'itinéraire
        this.router.navigate(['/itinaries']);
      },
      error => {
        console.log('Erreur lors de la création de l\'itinéraire', error);
      }
    );
  }
}
