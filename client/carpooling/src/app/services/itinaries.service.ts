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
    return this.http.get(this.baseUrl + 'itinariesFormatted');
  }

  // itinariesCreate(itinaries: { destination: string; startAddress: string, seats: number }): Observable<any> {
  //   return this.http.post(this.baseUrl + 'itinaries', itinaries);
  // }

  // itinariesCreate(itinaries: { destination: string; startAddress: string, seats: number }): Observable<any> {
  //   return this.http.post(this.baseUrl + 'itinaries', itinaries).pipe(
  //     tap((data: any) => {
  //       // ici, vous pouvez utiliser l'ID de l'itinéraire retourné pour effectuer une requête supplémentaire
  //       const itinaries_id = data.itinaries_id;
  //       this.http.get(this.baseUrl + 'itinaries/' + itinaries_id).subscribe(
  //         (itinariesData: any) => {
  //           // ici, vous pouvez utiliser les données de l'itinéraire retourné par la requête supplémentaire
  //           console.log(itinariesData);
  //         }
  //       );
  //     })
  //   );
  // }

  // itinariesCreate(itinaries: { destination: string; startAddress: string, seats: number }): Observable<any> {
  //   return this.http.post(this.baseUrl + 'itinaries', itinaries).pipe(
  //     switchMap((data: any) => {
  //       const itinaries_id: number = data.itinaries_id;
  //       console.log('Nouvel itinéraire créé avec succès. ID : ', itinaries_id);

  //       const itinarie_user: ItinariesUser = {
  //         // itinaries_user_id?: number;
  //         fk_itinaries: itinaries_id,
  //         fk_user: 'joseph',
  //         type_user: 'conductor',
  //         request_user: true,
  //         message: 'Nouvelle demande de trajet'
  //       };

  //       this.itinariesUserService.itinariesUserCreate(itinarie_user).subscribe(
  //         (response: any) => {
  //           console.log('Nouvelle demande de trajet créée avec succès. ID : ', response.id);
  //         },
  //         (error: any) => {
  //           console.error('Une erreur est survenue lors de la création de la demande de trajet : ', error);
  //         }
  //       );
  //     })
  //   );
  // }

  itinariesCreate(itinaries: { destination: string; startAddress: string, seats: number }): Observable<any> {
    const token = localStorage.getItem('token');
    const decodedToken: any = jwt_decode(token || ''); // provide default value if null
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    console.log(decodedToken)

    return this.http.post(this.baseUrl + 'itinaries', itinaries, { headers }).pipe(
      switchMap((data: any) => {
        const itinaries_id: number = data.itinaries_id;
        console.log('Nouvel itinéraire créé avec succès. ID : ', itinaries_id, headers);
        console.log('cestletoken', localStorage.getItem('token'))
        const itinariesUser: ItinariesUser = {
          fk_itinaries: itinaries_id,
          fk_user: decodedToken.id,
          type_user: 'conductor',
          request_user: true,
          message: 'Nouvelle demande de trajet'
        };

        return this.itinariesUserService.itinariesUserCreate(itinariesUser).pipe(
          tap((response: any) => {
            console.log('Nouvelle demande de trajet créée avec succès. ID : ', response.id);
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
