import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { LocalStorageService } from './core/services';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavBarComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'noesis-frontend';
  shouldShowNavBar = true;

  hiddenRoutes: string[] = ['/', '/login', '/signup'];

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.shouldShowNavBar = !this.hiddenRoutes.includes(
          event.urlAfterRedirects
        );
      }
    });

    window.addEventListener('beforeunload', this.clearLocalStorage);
  }

  ngOnDestroy() {
    window.removeEventListener('beforeunload', this.clearLocalStorage);
  }

  private clearLocalStorage = () => {
    this.localStorageService.clearAll();
  };
}
