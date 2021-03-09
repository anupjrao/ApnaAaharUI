import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {baseURL} from '../environments/environment';
import {GeneralUser} from './Models/GeneralUser'
import {visitorApiKey} from '../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private http: HttpClient) { }

  public authorizeVisitor(): Observable<string>{
    let newUser = new GeneralUser();
    newUser.userId = visitorApiKey;
    return this.http.post<string>(`${baseURL}/ApiAccess/AuthorizeApi`,newUser);
  }
}
