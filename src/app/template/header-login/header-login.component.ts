import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-login',
  standalone: false,

  templateUrl: './header-login.component.html',
  styleUrl: './header-login.component.css',
})
export class HeaderLoginComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn();
  }

  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
