import { InjectionToken, NgModule } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import * as firebaseui from 'firebaseui';

import { _firebaseUIAuthFactory, FirebaseUIAuth } from './firebaseui.auth.module';

export interface FirebaseUIAuthConfig {
  callbacks?: any;
  credentialHelper?: firebaseui.auth.CredentialHelper;
  queryParameterForSignInSuccessUrl?: string;
  queryParameterForWidgetMode?: string;
  signInFlow?: 'redirect' | 'popup';
  signInOptions: any;
  signInSuccessUrl?: string;
  tosUrl: string;
}

export const FirebaseUIAuthProvider = {
  provide: FirebaseUIAuth,
  useFactory: _firebaseUIAuthFactory,
  deps: [FirebaseApp]
};

@NgModule({
  providers: [FirebaseUIAuthProvider]
})
export class FirebaseUIAuthModule {
  static initializeApp() {
    return {
      ngModule: FirebaseUIAuthModule
    };
  }
}

export { FirebaseUIAuth };
