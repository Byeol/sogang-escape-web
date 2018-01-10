import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/core/auth';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent {
  constructor(private auth: AuthService, private router: Router) { }

  async signOut() {
    try {
      await this.auth.signOut();
      this.router.navigate(['/login']);
    } catch (e) {
      console.error('signOut() Error', e);
    }
  }

  get isAuthenticated() {
    return this.auth.isLoggedIn;
  }
}
