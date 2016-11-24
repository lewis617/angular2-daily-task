import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isCollapsed: boolean = true;
  logoutIsCollapsed: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.isCollapsed = true;
    this.logoutIsCollapsed = true;
    this.router.navigate([''])
  }
}
