import { NgModule } from '@angular/core';

import { AuthGuard } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';

const AUTH_PROVIDERS = [
  AuthGuard,
  AuthService
];

@NgModule({
  providers: [
    AUTH_PROVIDERS
  ]
})
export class AuthModule { }
