import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent {
  @Input() color: string = '#000000';
  @Input() top: string = '0px';
  @Input() clubs: {
    id_club: number;
    club_code: string;
    club_name: string;
    club_desc?: string;
    is_private: boolean;
    is_academic: boolean;
    created_at: string;
    clubs_status: string;
  }[] = [];

  visibleClubs: typeof this.clubs = [];
  currentStartIndex: number = 0;
  clubsPerPage: number = 4;

  ngOnInit() {
    this.updateVisibleClubs();
  }

  updateVisibleClubs() {
    this.visibleClubs = this.clubs.slice(
      this.currentStartIndex,
      this.currentStartIndex + this.clubsPerPage
    );
  }

  scrollRight() {
    if (this.currentStartIndex + this.clubsPerPage < this.clubs.length) {
      this.currentStartIndex++;
      this.updateVisibleClubs();
    }
  }

  scrollLeft() {
    if (this.currentStartIndex > 0) {
      this.currentStartIndex--;
      this.updateVisibleClubs();
    }
  }
}
