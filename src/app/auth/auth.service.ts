import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authenticated = false;


  constructor(
    private http: HttpClient
  ) { }

  set accessToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  get accessToken(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  signIn(data: any): Observable<any> {
    const url = `${environment.API}auth/login`;
    return this.http.post(url, data);
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this.authenticated) {
        return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
        return of(false);
    }

    return of(true);
  }
}
