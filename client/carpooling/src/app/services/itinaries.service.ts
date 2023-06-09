import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ItinariesUser, ItinariesUserService } from './itinarie-user.service';
import jwt_decode from 'jwt-decode';


export class Itinaries {
  "itinaries_id": number;
  "destination": string;
  "startAddress": string;
  "seats": number;
  "startDate": string;
  "hours": string;
}

export class ItinariesCard {
  "itinaries_id": number;
  "destination": string;
  "startAddress": string;
  "seats": number;
  "passengerEmails": string[];
  "conductorEmail": string;
  "startDate": string;
  "hours": string;

}

@Injectable({
  providedIn: 'root'
})
export class ItinariesService {
  baseUrl: string = 'http://pat.infolab.ecam.be:60846/api/'

  public selectedItinerary: any;

  constructor(private http: HttpClient, private itinariesUserService: ItinariesUserService) { }

  itinariesList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries');
  }

  itinariesListCard(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + 'itinariesCard', { "headers": headers });
  }

  itinariesListPassenger(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + `itinaries/PassengerList/${itinaries_id}`, { "headers": headers });
  }

  itinariesListMyCard(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + 'itinariesMyCard/', { "headers": headers });
  }

  itinariesCreate(itinaries: { destination: string; startAddress: string, seats: number }): Observable<any> {

    const token = localStorage.getItem('token');
    if (!token) {
      // handle case where token is not present
      console.error('Token not found in localStorage');
      return of(null);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });

    const decodedToken: any = jwt_decode(token);
    console.log(decodedToken)
    return this.http.post(this.baseUrl + 'itinaries', itinaries, { "headers": headers }).pipe(
      switchMap((data: any) => {
        const itinaries_id: number = data.itinaries_id;
        console.log('Nouvel itinéraire créé avec succès. ID : ', itinaries_id, headers);
        console.log('cestletoken', localStorage.getItem('token'))
        const itinariesUser: ItinariesUser = {
          fk_itinaries: itinaries_id,
          fk_user: decodedToken.id,
          type_user: 'conductor',
          request_user: 1,
          message: 'Initialisation of the itinary'
        };
        console.log('cestletoken2', localStorage.getItem('token'))

        return this.itinariesUserService.itinariesUserCreate(itinariesUser).pipe(
          tap((response: any) => {
            console.log('Nouvelle demande de trajet créée avec succès. ID : ', decodedToken.id);
          }),
          catchError((error: any) => {
            console.error('Une erreur est survenue lors de la création de la demande de trajet : ', error);
            return of(null);
          })
        );
      }),
      catchError((error: any) => {
        console.error('Une erreur est survenue lors de la création de l\'itinéraire : ', error);
        return of(null);
      })
    );
  }

  itinariesUpdate(itinariesId: number, itinaries: Itinaries): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put(this.baseUrl + 'itinarie/' + itinariesId, itinaries, { headers: headers });
  }

  itinariesDelete(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete(this.baseUrl + 'itinarie/' + itinaries_id, { "headers": headers });
  }

  itinariesIncrementSeats(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.patch(this.baseUrl + 'itinarie/' + itinaries_id + '/seatsplus', {}, { headers })
      .pipe(
        map((response: any) => {
          const updatedSeats = response.seats - 1;
          return { ...response, seats: updatedSeats };
        })
      );
  }

  itinariesDecrementSeats(itinaries_id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    return this.http.patch(this.baseUrl + 'itinarie/' + itinaries_id + '/seatsmin', {}, { headers })
      .pipe(
        map((response: any) => {
          const updatedSeats = response.seats - 1;
          return { ...response, seats: updatedSeats };
        })
      );
  }


  itinariesByStartAddress(startAddress: string): Observable<any> {
    const params = { "startAddress": startAddress };
    return this.http.get(this.baseUrl + 'itinaries', { params: params });
  }

  itinariesByAddress(address: string): Observable<any> {
    const params = { "address": address };
    return this.http.get(this.baseUrl + 'itinaries', { params: params });
  }

}
