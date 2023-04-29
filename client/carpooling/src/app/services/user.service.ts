import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class User {
  'email': string;
  'password': string;
  'address': string;
  'number_passenger_max': number;
  'lisence_plate': string;
  'picture': string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://localhost:8000/api/'

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(this.baseUrl + 'users');
  }

  userCreate(): Observable<any> {
    return this.http.post(this.baseUrl + 'user/register', {
      "email": "email",
      "password": "password",
      "address": "address",
      "number_passengers_max":3,
      "lisence_plate": "lisence_plate",
      "picture": "picture"
    });
  }
  

}