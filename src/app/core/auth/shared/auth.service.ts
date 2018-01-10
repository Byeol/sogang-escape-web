import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { UserInfo } from './user-info';

@Injectable()
export class AuthService {
  redirectUrl: string;
  private authUser: UserInfo;

  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      this.authUser = this.toUser(user);
    });
  }

  get authState(): Observable<UserInfo> {
    return this.afAuth.authState.map(this.toUser.bind(this));
  }

  get isLoggedIn(): boolean {
    return !!this.authUser;
  }

  get currentUser(): UserInfo {
    return this.authUser;
  }

  signOut(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  private toUser(user: firebase.User) {
    if (!user) {
      return null;
    }

    return {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      providerId: user.providerId,
      uid: user.uid
    };
  }
}
