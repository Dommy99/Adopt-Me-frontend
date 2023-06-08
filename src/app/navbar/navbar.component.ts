import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(public authService: AuthService) {}  // Inject the authentication service

  logout(): void {
    this.authService.logout();  // Logout the user
    console.log(this.logout);  // Log the logout function
  }
}
