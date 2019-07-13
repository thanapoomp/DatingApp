import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService) {}

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.authService.decodeToken();
    if (user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.photoUrl);
    }
  }
}
