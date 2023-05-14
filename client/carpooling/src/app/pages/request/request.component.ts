import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  public receivedData: any;

  constructor(private route: ActivatedRoute, private itinariesService: ItinariesService, private itinaries_userService: ItinariesUserService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      this.receivedData = decodedData;
    });
  }

  acceptRequest(user: any) {
    // Logique pour accepter la demande de l'utilisateur
    console.log('Accepted user:', user);
    const itinerariesId = user.fk_itinaries; // Récupérer l'ID de l'itinéraire à partir de l'utilisateur

    console.log(user.itinaries_user_id)
    this.itinariesService.itinariesDecrementSeats(itinerariesId).pipe(
      concatMap(() => this.itinaries_userService.itinariesUserAcceptPassenger(user.itinaries_user_id))
    ).subscribe(
      data => {
        // Gestion de la réponse après l'acceptation du passager et la diminution des places
        console.log('Acceptance and seat decrement success:', data);
        // Effectuer d'autres actions si nécessaire
      },
      error => {
        // Gestion des erreurs en cas d'échec de l'acceptation du passager ou de la diminution des places
        console.error('Error accepting passenger and decrementing seats:', error);
        // Effectuer d'autres actions en cas d'erreur
      }
    );
  }

  denyRequest(user: any) {
    // Logique pour accepter la demande de l'utilisateur
    console.log('Deny user:', user);
    const itinerariesId = user.fk_itinaries; // Récupérer l'ID de l'itinéraire à partir de l'utilisateur

    console.log(user.itinaries_user_id)
    this.itinariesService.itinariesIncrementSeats(itinerariesId).pipe(
      concatMap(() => this.itinaries_userService.itinariesUserRefusedPassenger(user.itinaries_user_id))
    ).subscribe(
      data => {
        // Gestion de la réponse après l'acceptation du passager et la diminution des places
        console.log('Acceptance and seat decrement success:', data);
        // Effectuer d'autres actions si nécessaire
      },
      error => {
        // Gestion des erreurs en cas d'échec de l'acceptation du passager ou de la diminution des places
        console.error('Error accepting passenger and decrementing seats:', error);
        // Effectuer d'autres actions en cas d'erreur
      }
    );
  }
}
