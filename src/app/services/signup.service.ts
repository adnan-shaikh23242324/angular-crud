import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Signup } from '../models/signup.model';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  private baseUrl: string = 'http://localhost:3000/signupusers'

  constructor(private http: HttpClient) { }
  postRegistration(registerObj: Signup) {
    return this.http.post<Signup>(`${this.baseUrl}`, registerObj)
  }
  getRegisteredUser() {
    return this.http.get<Signup[]>(`${this.baseUrl}`)

  }

  updateRegisteredUser(registerObj:Signup,id:number) {
    return this.http.put<Signup>(`${this.baseUrl}/${id}`,registerObj);

  }

  deleteRegistered(id:number) {
    return this.http.delete<Signup>(`${this.baseUrl}/${id}`)

  }

  getRegisteredUserTd(id:number) {
    return this.http.get<Signup>(`${this.baseUrl}/${id}`)

  }
}
