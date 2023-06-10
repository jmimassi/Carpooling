import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItinariesService, Itinaries, ItinariesCard } from '../../services/itinaries.service';
import { ItinariesUserService, ItinariesUser } from '../../services/itinarie-user.service';
import { concatMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent {

  public receivedData: any;

  constructor(private route: ActivatedRoute, private itinariesService: ItinariesService, private itinaries_userService: ItinariesUserService, private snackBar: MatSnackBar) { }

  // Fetch the passengers on component initialization
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const encodedData = params['data'];
      const decodedData = JSON.parse(decodeURIComponent(encodedData));
      console.log(decodedData);
      this.receivedData = decodedData;
    });
  }

  // Accept the request of the user
  acceptRequest(user: any) {
    if (user.request_user) {
      this.snackBar.open('This user is already accepted', 'Close', { duration: 3000 });
      return;
    }
    console.log('Accepted user:', user);
    const itinerariesId = user.fk_itinaries;

    console.log(user.itinaries_user_id)
    this.itinariesService.itinariesDecrementSeats(itinerariesId).pipe(
      concatMap(() => this.itinaries_userService.itinariesUserAcceptPassenger(user.itinaries_user_id))
    ).subscribe(
      data => {
        console.log('Acceptance and seat decrement success:', data);
        user.request_user = true;
      },
      error => {
        console.error('Error accepting passenger and decrementing seats:', error);
      }
    );
  }

  // Deny the request of the user
  denyRequest(user: any) {
    if (!user.request_user) {
      this.snackBar.open('This user is already denied', 'Close', { duration: 3000 });
      return;
    }
    console.log('Deny user:', user);
    const itinerariesId = user.fk_itinaries;

    console.log(user.itinaries_user_id)
    this.itinariesService.itinariesIncrementSeats(itinerariesId).pipe(
      concatMap(() => this.itinaries_userService.itinariesUserRefusedPassenger(user.itinaries_user_id))
    ).subscribe(
      data => {
        user.request_user = false;
        console.log('Acceptance and seat decrement success:', data);
      },
      error => {
        console.error('Error accepting passenger and decrementing seats:', error);
      }
    );
  }
}
