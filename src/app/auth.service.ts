import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = new BehaviorSubject(null);
  constructor(private _HttpClient:HttpClient) { }

  register(formData:any):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signup',formData);
  }

  login(formData:any):Observable<any>{
    return this._HttpClient.post('https://route-egypt-api.herokuapp.com/signin',formData);
  }

  saveCurrentUser(){
    let token:any = localStorage.getItem('userToken');
    this.currentUser.next(jwtDecode(token));
    console.log(this.currentUser);
  }
}
