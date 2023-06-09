import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItinariesService, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService } from '../../services/itinarie-user.service';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss']
})
export class RequestPage {
  receivedData: any;

  constructor(
    private route: ActivatedRoute,
    private itinariesService: ItinariesService,
    private itinariesUserService: ItinariesUserService,
  ) { }

  // Fetch data at the start of the component
  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      console.log("decodedData", decodedData);
      this.receivedData = decodedData;
    });
  }

  // Accept a user by decrementing the number of seats and changing his request_user attribute to true
  acceptRequest(user: any) {
    if (user.request_user) {
      return;
    }

    console.log('Accepted user:', user);
    const itinerariesId = user.fk_itinaries;

    console.log(user.itinaries_user_id);
    this.itinariesService.itinariesDecrementSeats(itinerariesId).pipe(
      concatMap(() => this.itinariesUserService.itinariesUserAcceptPassenger(user.itinaries_user_id))
    ).subscribe(
      data => {
        user.request_user = true;
        console.log('Acceptance and seat decrement success:', data);
        // Effectuer d'autres actions si nécessaire
      },
      error => {
        console.error('Error accepting passenger and decrementing seats:', error);
        // Effectuer d'autres actions en cas d'erreur
      }
    );
  }

  // Deny a user by incrementing the number of seats and changing his request_user attribute to false
  denyRequest(user: any) {
    if (!user.request_user) {
      return;
    }

    console.log('Deny user:', user);
    const itinerariesId = user.fk_itinaries;

    console.log(user.itinaries_user_id);
    this.itinariesService.itinariesIncrementSeats(itinerariesId).pipe(
      concatMap(() => this.itinariesUserService.itinariesUserRefusedPassenger(user.itinaries_user_id))
    ).subscribe(
      data => {
        user.request_user = false;
        console.log('Denial and seat increment success:', data);
      },
      error => {
        console.error('Error denying passenger and incrementing seats:', error);
      }
    );
  }
}
