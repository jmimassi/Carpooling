import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';

@Component({
  selector: 'app-climb-on-board',
  templateUrl: './climb-on-board.page.html',
  styleUrls: ['./climb-on-board.page.scss'],
})
export class ClimbOnBoardPage implements OnInit {
  itinerary: any;
  message: any;
  username: string = '';

  constructor(
    private route: ActivatedRoute,
    private itinariesUserService: ItinariesUserService
  ) { }

  ngOnInit() {
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
        // Perform any additional actions here
      },
      error => {
        console.log('Erreur lors de la création de l\'itinéraire', error);
      }
    );
  }
}