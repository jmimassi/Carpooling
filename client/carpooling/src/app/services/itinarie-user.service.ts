import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class ItinariesUser {
  'itinaries_user_id': number;
  'type_user': string;
  'request_user': boolean;
  'message': string;
}


@Injectable({
  providedIn: 'root'
})
export class ItinariesUserService {

  

  baseUrl: string = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  itinariesUserList(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  itinariesUserCreate(itinariesUser: ItinariesUser): Observable<any> {
    return this.http.post(this.baseUrl, itinariesUser);
  }

  itinariesUserById(itinariesUserId: number): Observable<any> {
    return this.http.get(this.baseUrl + itinariesUserId);
  }

  itinariesUserByUserConnected(userId: number): Observable<any> {
    return this.http.get(this.baseUrl + '?fk_user=' + userId);
  }

  itinariesUserDelete(itinariesUserId: number): Observable<any> {
    return this.http.delete(this.baseUrl + itinariesUserId);
  }

  itinariesUserAcceptPassenger(itinariesUserId: number): Observable<any> {
    return this.http.put(this.baseUrl + itinariesUserId + '/accept', {});
  }

  itinariesUserRefusedPassenger(itinariesUserId: number): Observable<any> {
    return this.http.put(this.baseUrl + itinariesUserId + '/refuse', {});
  }
}
