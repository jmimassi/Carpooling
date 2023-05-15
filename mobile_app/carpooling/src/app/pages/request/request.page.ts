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

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      console.log("decodedData", decodedData);
      this.receivedData = decodedData;
    });
  }

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
        console.log('Acceptance and seat decrement success:', data);
        // Effectuer d'autres actions si nécessaire
      },
      error => {
        console.error('Error accepting passenger and decrementing seats:', error);
        // Effectuer d'autres actions en cas d'erreur
      }
    );
  }

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
        console.log('Denial and seat increment success:', data);
        // Effectuer d'autres actions si nécessaire
      },
      error => {
        console.error('Error denying passenger and incrementing seats:', error);
        // Effectuer d'autres actions en cas d'erreur
      }
    );
  }
}
