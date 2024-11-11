import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../create-club-dialog/create-club-dialog.component';

@Component({
  selector: 'app-clubs-home',
  standalone: true,
  imports: [CommonModule, CreateClubDialogComponent],
  templateUrl: './clubs-home.component.html',
  styleUrl: './clubs-home.component.css',
})
export class ClubsHomeComponent {
  isDialogOpen = false;

  clubs = [
    { name: 'Literatura', founder: 'Cesar Augusto' },
    { name: 'Historia', founder: 'María Perez' },
    { name: 'Filosofía', founder: 'Juan Carlos' },
    { name: 'Literatura', founder: 'Cesar Augusto' },
    { name: 'Historia', founder: 'María Perez' },
    { name: 'Filosofía', founder: 'Juan Carlos' },
    { name: 'Literatura', founder: 'Cesar Augusto' },
    { name: 'Historia', founder: 'María Perez' },
    { name: 'Filosofía', founder: 'Juan Carlos' },
  ];

  visibleClubs: { name: string; founder: string }[] = [];
  currentStartIndex: number = 0;
  clubsPerPage: number = 4;

  ngOnInit() {
    this.updateVisibleClubs();
  }

  // Method for updating the list of visible clubs
  updateVisibleClubs() {
    this.visibleClubs = this.clubs.slice(
      this.currentStartIndex,
      this.currentStartIndex + this.clubsPerPage
    );
  }

  // Method to move to the right of a club
  scrollRight() {
    if (this.currentStartIndex + this.clubsPerPage < this.clubs.length) {
      this.currentStartIndex += 1;
      this.updateVisibleClubs();
    }
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
