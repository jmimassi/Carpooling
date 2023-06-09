import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class ItinariesUser {
  'itinaries_user_id'?: number;
  'type_user': string;
  'request_user': number;
  'message': string;
  'fk_itinaries': number;
  'fk_user': string;
}

@Injectable({
  providedIn: 'root'
})
export class ItinariesUserService {

  baseUrl: string = 'http://pat.infolab.ecam.be:60846/api/';

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  });

  constructor(private http: HttpClient) { }

  itinariesUserList(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.headers });
  }

  itinariesUserCreate(itinariesUser: ItinariesUser): Observable<any> {
    return this.http.post(this.baseUrl + 'bookings', itinariesUser, { headers: this.headers });
  }

  getItinariesUserByItineraryId(itinariesId: number) {
    console.log(itinariesId)
    return this.http.get<ItinariesUser[]>(this.baseUrl + `booking/${itinariesId}`, { headers: this.headers });
  }

  itinariesUserByUserConnected(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + '?fk_user=' + userId, { headers: this.headers });
  }

  itinariesUserDelete(fk_user: string, fk_itinaries: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'booking/user/' + fk_user + '/itinarie/' + fk_itinaries, { headers: this.headers });
  }

  itinariesUserAcceptPassenger(itinaries_user_id: string): Observable<any> {
    return this.http.patch(this.baseUrl + 'booking/' + itinaries_user_id + '/accept', {}, { headers: this.headers });
  }

  itinariesUserRefusedPassenger(itinaries_user_id: string): Observable<any> {
    return this.http.patch(this.baseUrl + 'booking/' + itinaries_user_id + '/deny', {}, { headers: this.headers });
  }
}
