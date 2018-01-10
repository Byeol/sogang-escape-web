import { InjectionToken, } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebaseui from 'firebaseui';

import { FirebaseUIAuthConfig } from './';

export class FirebaseUIAuth implements firebaseui.auth.AuthUI {
  start: (element: any, config: FirebaseUIAuthConfig) => void;
}

export function _firebaseUIAuthFactory(app: FirebaseApp): FirebaseUIAuth {
  const instance = firebaseui.auth.AuthUI.getInstance(app.name);
  return (instance || new firebaseui.auth.AuthUI(app.auth(), app.name)) as FirebaseUIAuth;
}
