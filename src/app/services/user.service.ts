import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  private getoken():string {
    const token = localStorage.getItem("token");
    return token
  }

  // User API Methods
  endpointURL: string = "http://localhost:5000/user";
  registerUser(user: User) {
    // User is a class defined in the models folder.
    return this.http.post(`${this.endpointURL}`, user, {headers:{mode:"cors"}});
  }
}
