import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
interface Medal {
  text: string;
  color: string;
}
@Component({
  selector: 'app-medal-list',
  standalone: true,
  imports: [NgStyle, NgForOf, NgIf],
  templateUrl: './medal-list.component.html',
  styleUrl: './medal-list.component.css',
})
export class MedalListComponent {
  visibleMedals: Medal[] = [];
  currentIndex = 0;
  maxVisibleMedals = 4;

  medals: Medal[] = [
    { text: 'Reached 15 pts', color: '#cd7f32' },
    { text: 'Reached 25 pts', color: '#c0c0c0' },
    { text: 'Reached 40 pts', color: '#ffd700' },
    { text: 'Completed 5 quizzes', color: '#4b0082' },
    { text: 'Special Achievement', color: '#2a9d8f' },
  ];

  isCircleVisible: boolean = true; // Controla la visibilidad del círculo

  get showLeftButton(): boolean {
    return this.currentIndex > 0;
  }

  get showRightButton(): boolean {
    return this.currentIndex + this.maxVisibleMedals < this.medals.length;
  }

  constructor() {
    this.updateVisibleMedals();
  }

  updateVisibleMedals() {
    this.visibleMedals = this.medals.slice(
      this.currentIndex,
      this.currentIndex + this.maxVisibleMedals
    );
  }

  scrollLeft() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateVisibleMedals();
    }
  }

  scrollRight() {
    if (this.currentIndex + this.maxVisibleMedals < this.medals.length) {
      this.currentIndex++;
      this.updateVisibleMedals();
    }
  }
}
