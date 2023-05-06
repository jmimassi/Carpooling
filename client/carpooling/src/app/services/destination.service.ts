import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class Destination {
  'destination_id': number;
  'address': string;
}

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  baseUrl: string = 'http://localhost:8000/api/destinations/';

  constructor(private http: HttpClient) { }

  destinationList(): Observable<Destination[]> {
    return this.http.get<Destination[]>(this.baseUrl);
  }

  destinationCreate(destination: Destination): Observable<Destination> {
    return this.http.post<Destination>(this.baseUrl, destination);
  }
}
