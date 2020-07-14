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

  // User API Methods
  endpointURL = "localhost:8080/user";
  registerUser(user: User) {
    // User is a class defined in the models folder.
    return this.http.post(`${this.endpointURL}`, user);
  }
}
