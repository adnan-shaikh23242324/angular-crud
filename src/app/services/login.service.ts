import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private baseUrl: string = 'http://localhost:3000/signupusers'

  constructor(private http: HttpClient) { }
  postRegistration(registerObj: Login) {
    return this.http.post<Login>(`${this.baseUrl}`, registerObj)
  }
  getRegisteredUser():Observable<any> {
    return this.http.get<Login[]>(`${this.baseUrl}`)

  }
  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/users?email=${email}&password=${password}`);
  }

  // updateRegisteredUser(registerObj:Login,id:number) {
  //   return this.http.put<Login>(`${this.baseUrl}/${id}`,registerObj);

  // }

  // deleteRegistered(id:number) {
  //   return this.http.delete<Login>(`${this.baseUrl}/${id}`)

  // }

  // getRegisteredUserTd(id:number) {
  //   return this.http.get<Login>(`${this.baseUrl}/${id}`)

  // }
}
