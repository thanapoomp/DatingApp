import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
    this.currentUser.photoUrl = photoUrl;
    console.log(photoUrl);
    console.log(this.currentUser);
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map(
        (response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.currentUser = user.user;
            this.decodeToken();
            this.changeMemberPhoto(user.user.photoUrl);
          }
        })
    );
  }

  decodeToken() {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
  }

  loggedInId(): number {
    const token = localStorage.getItem('token');
    this.decodedToken = this.jwtHelper.decodeToken(token);
    const id = this.decodedToken.nameid;
    return id;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

}
