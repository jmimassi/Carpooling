import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class User {
  'email': string;
  'password': string;
  'address': string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://pat.infolab.ecam.be:64346/api/';

  constructor(private http: HttpClient) { }

  /**
   * Retrieves a list of users.
   * @returns An Observable object for the HTTP response.
   */
  getUserList(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(this.baseUrl + 'protected/users', { headers: headers });
  }

  /**
   * Creates a new user.
   * @param user The user object containing the user details.
   * @returns An Observable object for the HTTP response.
   */
  userCreate(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.baseUrl + 'user/register', user, { headers: headers });
  }

  /**
   * Logs in a user.
   * @param user The user object containing the login credentials.
   * @returns An Observable object for the HTTP response.
   */
  userLogin(user: User): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.baseUrl + 'user/login', user, { headers: headers });
  }

  /**
   * Logs out the current user.
   * @returns An Observable object for the HTTP response.
   */
  userLogout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post(this.baseUrl + 'user/logout', null, { headers: headers });
  }
}
