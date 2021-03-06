import { AuthService } from './auth/auth.service';
import { Configs } from './configs';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import * as firebase from 'firebase';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: Configs.FIREBASE_API_KEY,
      authDomain: Configs.FIREBASE_AUTH_DOMAIN
    });
    this.authService.getToken();
  }
}
