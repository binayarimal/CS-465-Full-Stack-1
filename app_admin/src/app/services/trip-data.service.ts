import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { BROWSER_STORAGE } from '../storage';

import { Trip } from '../models/trip';
import e from 'express';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage) { 

    }

  url = 'http://localhost:3000/api/trips';
  baseUrl = 'http://localhost:3000/api';
  header = new HttpHeaders({
    'content-trype': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('travlr-token')}`
  })

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url);

  }
  getTrip(tripCode: string): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url + '/' + tripCode);

  }

  addTrip(formData: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.url, formData, {headers:this.header});
  }

  updateTrip(formData: Trip): Observable<Trip> {

    console.log("here")
    return this.http.put<Trip>(this.url + '/' + formData.code, formData, {headers:this.header});
  }

  handleError(error: any): Promise<any> {
    console.error('Something is wrong', error)
    return Promise.reject(error.message | error)


  }
  // Call to our /login endpoint, returns JWT
  login(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::login');
    return this.handleAuthAPICall('login', user, passwd);
  }
  // Call to our /register endpoint, creates user and returns JWT
  register(user: User, passwd: string): Observable<AuthResponse> {
    // console.log('Inside TripDataService::register');
    return this.handleAuthAPICall('register', user, passwd);
  }
  // helper method to process both login and register methods
  handleAuthAPICall(endpoint: string, user: User, passwd: string):
    Observable<AuthResponse> {
    // console.log('Inside TripDataService::handleAuthAPICall');
    let formData = {
      name: user.name,
      email: user.email,
      password: passwd
    };
    return this.http.post<AuthResponse>(this.baseUrl + '/' + endpoint,
      formData);
  }


}
