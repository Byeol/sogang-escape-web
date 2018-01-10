import { Component, ElementRef, Inject, Input, OnInit, ViewChild } from '@angular/core';
import * as firebase from 'firebase/app';

import { FirebaseUIAuth, FirebaseUIAuthConfig } from '../firebaseui/auth';

@Component({
  selector: 'firebaseui-auth', // tslint:disable-line:component-selector
  template: '<div #container></div>'
})
export class FirebaseUIAuthComponent implements OnInit {
  @Input() config: FirebaseUIAuthConfig;
  @ViewChild('container') private el: ElementRef;

  constructor(
    public ui: FirebaseUIAuth,
  ) { }

  ngOnInit() {
    this.ui.start(this.el.nativeElement, this.config);
  }
}
