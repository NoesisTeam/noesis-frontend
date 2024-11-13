import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-public-club-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-club-list.component.html',
  styleUrl: './public-club-list.component.css',
})
export class PublicClubListComponent {
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
}
