import { Component } from '@angular/core';
import { NgForOf, NgIf, NgStyle } from '@angular/common';

interface Medal {
  text: string;
  color: string;
}

@Component({
  selector: 'app-progress',
  standalone: true,
  templateUrl: './profile.component.html',
  imports: [NgStyle, NgForOf, NgIf],
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  genericMedalIcon: string = '/assets/icons/generic-medal.png';

  medals: Medal[] = [
    { text: 'Reached 15 pts', color: '#cd7f32' },
    { text: 'Reached 25 pts', color: '#c0c0c0' },
    { text: 'Reached 40 pts', color: '#ffd700' },
    { text: 'Completed 5 quizzes', color: '#4b0082' },
    { text: 'Special Achievement', color: '#2a9d8f' },
  ];

  visibleMedals: Medal[] = [];
  currentIndex = 0;
  maxVisibleMedals = 4;

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
