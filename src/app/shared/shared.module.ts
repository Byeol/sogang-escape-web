import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AccountInfoComponent } from './account-info/account-info.component';
import { FirebaseUIAuthComponent } from './firebaseui/firebaseui-auth.component';
import { MaterialModule } from './material/material.module';

const SHARED_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  FlexLayoutModule,
  RouterModule,
  MaterialModule
];

const SHARED_DIRECTIVES = [
  FirebaseUIAuthComponent,
  AccountInfoComponent
];

@NgModule({
  imports: [
    SHARED_MODULES
  ],
  declarations: [
    SHARED_DIRECTIVES
  ],
  exports: [
    SHARED_MODULES,
    SHARED_DIRECTIVES
  ]
})
export class SharedModule { }
