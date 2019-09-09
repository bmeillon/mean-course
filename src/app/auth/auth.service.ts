import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root'})
export class AuthService {
  private token: string;
  isAuthenticated = false;

  // Use to push the token for components that needs
  private authServiceListener = new Subject<boolean>();

  constructor(private http: HttpClient) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authServiceListener.asObservable();
  }

  createUser(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post('http://localhost:3000/api/user/signup', authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const authData: AuthData = {email, password};
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;

      if (token) {
        this.isAuthenticated = true;
        this.authServiceListener.next(true);
      }
    });
  }




}
