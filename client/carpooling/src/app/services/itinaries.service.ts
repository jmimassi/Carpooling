import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { ItinariesUser, ItinariesUserService } from './itinarie-user.service';
import jwt_decode from 'jwt-decode';


export class Itinaries {
  "itinaries_id": number;
  "destination": string;
  "startAddress": string;
  "seats": number;
  "email": string;
  "itinaries_users": string[];
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
  baseUrl: string = 'http://localhost:8000/api/'

  constructor(private http: HttpClient, private itinariesUserService: ItinariesUserService) { }

  itinariesList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries');
  }

  itinariesListFormatted(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinariesCard');
  }

  itinariesListMyCard(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + 'itinariesMyCard', {headers: headers});
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
          request_user: true,
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




  itinariesUpdate(itinaries: Itinaries): Observable<any> {
    return this.http.put(this.baseUrl + 'itinaries/' + itinaries.itinaries_id, itinaries);
  }

  itinariesDelete(itinaries_id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'itinaries/' + itinaries_id);
  }

  itinariesUpdateSeats(itinaries_id: number, seats: number): Observable<any> {
    const data = { "seats": seats };
    return this.http.patch(this.baseUrl + 'itinaries/' + itinaries_id, data);
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
