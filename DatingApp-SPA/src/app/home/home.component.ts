import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  values: any;

  constructor(private http: HttpClient, public authService: AuthService) { }

  ngOnInit() {
  }

  registerToggle() {
    this.registerMode = true;
  }

  getValues() {
    this.http.get('http://localhost:5000/api/values/HelloWorld').subscribe(
      response => {
        this.values = response;
      }, error => {
        console.log(error);
      }
    );
  }

  cancelRegisterMode(registerMode: boolean) {
    this.registerMode = registerMode;
  }
}
