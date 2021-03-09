import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/Models/User'
import { baseURL } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {
  private apiURL;
  httpOptions = {
    headers: new HttpHeaders({
      'Accept': ['application/json', 'text/plain'],
      'Content-Type': ['application/json', 'text/plain'],
      'responseType': ['text', 'application/json']
    }),
  };
  constructor(private http: HttpClient) {
    this.apiURL = baseURL;
  }

  authenticate(user: User): Observable<any> {
    return this.http.post<User>(`${this.apiURL}/Account/Login`, user, this.httpOptions);
  }

}
