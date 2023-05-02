import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import { MonFormulaire } from './mon-formulaire.model';

export class User {
  'email': string;
  'password': string;
  'address': string;
  'number_passengers_max': number;
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get(this.baseUrl + 'protected/users', { "headers": headers });
  }

  userCreate(users: { email: string; password: string, address: string, number_passengers_max: number, lisence_plate: string, picture: string }): Observable<any> {
    return this.http.post(this.baseUrl + 'user/register', users);
  }


}