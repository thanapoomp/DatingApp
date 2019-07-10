import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private alertify: AlertifyService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.logOut();
    this.router.navigate(['/home']);
  }

}
