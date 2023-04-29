import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Itinaries {
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

  getItinariesList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries');
  }

  ItinariesCreate(): Observable<any> {
    return this.http.post(this.baseUrl + 'itinaries', {
      "email": "email",
      "password": "password",
      "address": "address",
      "number_passengers_max":3,
      "lisence_plate": "lisence_plate",
      "picture": "picture"
    });
  }

  getItinariesStartAddressList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries/{startAddress}');
  }

  getItinariesAdressList(): Observable<any> {
    return this.http.get(this.baseUrl + 'itinaries/{address}');
  }

}