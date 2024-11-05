import { Component } from '@angular/core';

@Component({
  selector: 'app-clubs-home',
  standalone: true,
  imports: [],
  templateUrl: './clubs-home.component.html',
  styleUrl: './clubs-home.component.css',
})
export class ClubsHomeComponent {
  clubs = [
    { nombre: 'Literatura', fundador: 'Cesar Augusto' },
    { nombre: 'Historia', fundador: 'María Perez' },
    { nombre: 'Filosofía', fundador: 'Juan Carlos' },
  ];

  scrollRight(carousel: HTMLElement) {
    carousel.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
