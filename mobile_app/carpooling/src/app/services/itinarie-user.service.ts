import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// An ItinarieUser is a booking
export interface ItinariesUser {
  itinaries_user_id?: number;
  type_user: string;
  request_user: number;
  message: string;
  fk_itinaries: number;
  fk_user: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItinariesUserService {

  baseUrl: string = 'https://pat.infolab.ecam.be:64346/api/';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  /**
   * Fetches the list of bookings.
   * @returns An Observable object emitting an array of ItinariesUser objects.
   */
  itinariesUserList(): Observable<ItinariesUser[]> {
    return this.http.get<ItinariesUser[]>(this.baseUrl, { headers: this.headers });
  }

  /**
   * Creates a new booking.
   * @param itinariesUser The ItinariesUser object representing the itinerary user to create.
   * @returns An Observable object for the HTTP response.
   */
  itinariesUserCreate(itinariesUser: ItinariesUser): Observable<any> {
    return this.http.post(this.baseUrl + 'bookings', itinariesUser, { headers: this.headers });
  }

  /**
   * Retrieves the booking for a specific itinerary ID.
   * @param itinariesId The ID of the itinerary to retrieve the itinerary users for.
   * @returns An Observable object emitting an array of ItinariesUser objects.
   */
  getItinariesUserByItineraryId(itinariesId: number): Observable<ItinariesUser[]> {
    return this.http.get<ItinariesUser[]>(this.baseUrl + `booking/${itinariesId}`, { headers: this.headers });
  }

  /**
   * Retrieves the booking for a specific connected user ID.
   * @param userId The ID of the connected user to retrieve the itinerary users for.
   * @returns An Observable object emitting an array of ItinariesUser objects.
   */
  itinariesUserByUserConnected(userId: number): Observable<ItinariesUser[]> {
    return this.http.get<ItinariesUser[]>(this.baseUrl + '?fk_user=' + userId, { headers: this.headers });
  }

  /**
   * Deletes a specific booking.
   * @param fk_user The ID of the user to delete.
   * @param fk_itinaries The ID of the itinerary associated with the user.
   * @returns An Observable object for the HTTP response.
   */
  itinariesUserDelete(fk_user: string, fk_itinaries: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'booking/user/' + fk_user + '/itinarie/' + fk_itinaries, { headers: this.headers });
  }

  /**
   * Accepts a passenger for a specific booking.
   * @param itinaries_user_id The ID of the itinerary user to accept the passenger for.
   * @returns An Observable object for the HTTP response.
   */
  itinariesUserAcceptPassenger(itinaries_user_id: string): Observable<any> {
    return this.http.patch(this.baseUrl + 'booking/' + itinaries_user_id + '/accept', {}, { headers: this.headers });
  }

  /**
   * Rejects a passenger for a specific booking.
   * @param itinaries_user_id The ID of the itinerary user to reject the passenger for.
   * @returns An Observable object for the HTTP response.
   */
  itinariesUserRefusedPassenger(itinaries_user_id: string): Observable<any> {
    return this.http.patch(this.baseUrl + 'booking/' + itinaries_user_id + '/deny', {}, { headers: this.headers });
  }
}
