import { Component, AfterViewInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent implements AfterViewInit {
  hiddenRoutes: String[] = ['/', '/login', '/signup'];

  constructor(private router: Router) {}

  shouldDisplayNavBar(): boolean {
    return !this.hiddenRoutes.includes(this.router.url);
  }
  ngAfterViewInit() {
    const listItems = document.querySelectorAll('ul li');

    listItems.forEach((item) => {
      item.addEventListener('click', () => {
        // Removes the 'active' class from all elements
        listItems.forEach((li) => li.classList.remove('active'));
        // Adds the class 'active' to the clicked element
        item.classList.add('active');
      });
    });
  }
}
