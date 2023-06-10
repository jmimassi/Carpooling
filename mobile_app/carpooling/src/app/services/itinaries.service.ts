import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ItinariesUser, ItinariesUserService } from './itinarie-user.service';
import jwt_decode from 'jwt-decode';

/**
 * Represents an itinerary.
 */
export class Itinaries {
  'itinaries_id': number;
  'destination': string;
  'startAddress': string;
  'seats': number;
  'startDate': string;
  'hours': string;
}

/**
 * Represents an itinerary card.
 */
export class ItinariesCard {
  'itinaries_id': number;
  'destination': string;
  'startAddress': string;
  'seats': number;
  'passengerEmails': string[];
  'conductorEmail': string;
  'startDate': string;
  'hours': string;
  'licensePlate': string;
  'passengerRequest': Record<string, boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class ItinariesService {
  baseUrl = 'https://pat.infolab.ecam.be:64346/api/';

  public selectedItinerary: any;

  constructor(private http: HttpClient, private itinariesUserService: ItinariesUserService) { }

  /**
   * Retrieves a list of all itineraries.
   * @returns An Observable object for the HTTP response.
   */
  itinariesList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries');
  }

  /**
   * Retrieves a formatted list of all itineraries.
   * @returns An Observable object for the HTTP response.
   */
  itinariesListFormatted(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + 'itinariesCard', { headers: headers });
  }

  /**
   * Retrieves the list of passengers for a specific itinerary.
   * @param itinaries_id The ID of the itinerary.
   * @returns An Observable object for the HTTP response.
   */
  itinariesListPassenger(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + `itinaries/PassengerList/${itinaries_id}`, { headers: headers });
  }

  /**
   * Retrieves the list of itineraries for the currently logged-in user.
   * @returns An Observable object for the HTTP response.
   */
  itinariesListMyCard(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + 'itinariesMyCard/', { headers: headers });
  }

  /**
   * Creates a new itinerary and add him as a conductor
   * @param itinaries The details of the itinerary to create.
   * @returns An Observable object for the HTTP response.
   */
  itinariesCreate(itinaries: { destination: string; startAddress: string; seats: number }): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const decodedToken: any = jwt_decode(token);

    return this.http.post(this.baseUrl + 'itinaries', itinaries, { headers: headers }).pipe(
      switchMap((data: any) => {
        const itinaries_id: number = data.itinaries_id;
        const itinariesUser: ItinariesUser = {
          fk_itinaries: itinaries_id,
          fk_user: decodedToken.id,
          type_user: 'conductor',
          request_user: 1,
          message: 'Initialisation of the itinerary'
        };

        return this.itinariesUserService.itinariesUserCreate(itinariesUser).pipe(
          tap((response: any) => {
            console.log('New itinerary request created successfully. ID:', decodedToken.id);
          }),
          catchError((error: any) => {
            console.error('An error occurred while creating the itinerary request:', error);
            return of(null);
          })
        );
      }),
      catchError((error: any) => {
        console.error('An error occurred while creating the itinerary:', error);
        return of(null);
      })
    );
  }

  /**
   * Updates an existing itinerary.
   * @param itinariesId The ID of the itinerary to update.
   * @param itinaries The updated itinerary details.
   * @returns An Observable object for the HTTP response.
   */
  itinariesUpdate(itinariesId: number, itinaries: Itinaries): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(this.baseUrl + 'itinarie/' + itinariesId, itinaries, { headers: headers });
  }

  /**
   * Deletes an existing itinerary.
   * @param itinaries_id The ID of the itinerary to delete.
   * @returns An Observable object for the HTTP response.
   */
  itinariesDelete(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(this.baseUrl + 'itinarie/' + itinaries_id, { headers: headers });
  }

  /**
   * Increments the number of available seats for an itinerary.
   * @param itinaries_id The ID of the itinerary.
   * @returns An Observable object for the HTTP response.
   */
  itinariesIncrementSeats(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.patch(this.baseUrl + 'itinarie/' + itinaries_id + '/seatsplus', {}, { headers })
      .pipe(
        map((response: any) => {
          const updatedSeats = response.seats - 1;
          return { ...response, seats: updatedSeats };
        })
      );
  }

  /**
   * Decrements the number of available seats for an itinerary.
   * @param itinaries_id The ID of the itinerary.
   * @returns An Observable object for the HTTP response.
   */
  itinariesDecrementSeats(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.patch(this.baseUrl + 'itinarie/' + itinaries_id + '/seatsmin', {}, { headers })
      .pipe(
        map((response: any) => {
          const updatedSeats = response.seats - 1;
          return { ...response, seats: updatedSeats };
        })
      );
  }

  /**
   * Retrieves a list of itineraries by start address.
   * @param startAddress The start address to search for.
   * @returns An Observable object for the HTTP response.
   */
  itinariesByStartAddress(startAddress: string): Observable<any> {
    const params = { startAddress: startAddress };
    return this.http.get(this.baseUrl + 'itinaries', { params: params });
  }

  /**
   * Retrieves a list of itineraries by address.
   * @param address The address to search for.
   * @returns An Observable object for the HTTP response.
   */
  itinariesByAddress(address: string): Observable<any> {
    const params = { address: address };
    return this.http.get(this.baseUrl + 'itinaries', { params: params });
  }
}
