import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent {
  hiddenRoutes: String[] = ['/', '/login', '/signup'];

  constructor(private router: Router) {}

  shouldDisplayNavBar(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
}
