import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import * as firebaseui from 'firebaseui';

import { AuthService } from 'app/core/auth';
import { FirebaseUIAuthConfig } from 'app/shared/firebaseui/auth';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  config: FirebaseUIAuthConfig;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.config = {
      callbacks: {
        signInSuccess: () => {
          this.router.navigate([this.signInSuccessUrl]);
          return false;
        }
      },
      credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
      signInFlow: 'popup',
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
      ],
      signInSuccessUrl: this.signInSuccessUrl,
      tosUrl: '<your-tos-url>'
    };
  }

  get signInSuccessUrl(): string {
    return this.auth.redirectUrl || '/';
  }
}
