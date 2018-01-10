import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  imports: [
    SharedModule,
    PagesRoutingModule
  ],
  declarations: [
    SignInComponent
  ]
})
export class PagesModule { }
