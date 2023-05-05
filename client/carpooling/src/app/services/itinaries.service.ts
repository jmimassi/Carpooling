// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// export class Itinaries {
//   "itinaries_id": number;
//   "fk_destination": number;
//   "startAddress": string;
//   "seats": number
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ItinariesService {
//   baseUrl: string = 'http://localhost:8000/api/'

//   constructor(private http: HttpClient) { }

//   ItinariesList(): Observable<any> {
//     return this.http.get(this.baseUrl + 'itinaries');
//   }

//   ItinariesCreate(users: { email: string; password: string, address: string, number_passengers_max: number, lisence_plate: string, picture: string }): Observable<any> {
//     return this.http.post(this.baseUrl + 'itinaries', {
//       "fk_destination": number;
//       "startAddress": string;
//       "seats": number
//     });
//   }

//   ItinariesStartAddressList(): Observable<any> {
//     return this.http.get(this.baseUrl + 'itinaries/{startAddress}');
//   }

//   ItinariesAdressList(): Observable<any> {
//     return this.http.get(this.baseUrl + 'itinaries/{address}');
//   }

// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Itinaries {
  "itinaries_id": number;
  "fk_destination": number;
  "startAddress": string;
  "seats": number
}

@Injectable({
  providedIn: 'root'
})
export class ItinariesService {
  baseUrl: string = 'http://localhost:8000/api/'

  constructor(private http: HttpClient) { }

  itinariesList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries');
  }

  itinariesCreate(itinaries: { fk_destination: number; startAddress: string, seats: number }): Observable<any> {
    return this.http.post(this.baseUrl + 'itinaries', itinaries);
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
