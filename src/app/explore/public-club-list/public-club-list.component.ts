import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Club } from '../../core/domain/entities';
import { ClubsService } from '../../core/services/clubs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-club-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-club-list.component.html',
  styleUrl: './public-club-list.component.css',
})
export class PublicClubListComponent {
  constructor(private clubsService: ClubsService, private router: Router) {}
  @Input() clubs: Club[] = [];

  clubRequest(id_club: number, is_private: boolean) {
    const userId = this.clubsService.getUserId();
    if (userId != null) {
      if (is_private) {
        this.clubsService.privateClubRequest(userId, id_club).subscribe({
          next: (res) => {
            alert(res.message);
            // TODO: Reload page
          },
          error: (err) => {
            alert(err.message);
          },
        });
      } else {
        this.clubsService.publicClubRequest(userId, id_club).subscribe({
          next: (res) => {
            alert(res.message);
            this.router.navigate(['/clubs']);
          },
          error: (err) => {
            alert(err.message);
          },
        });
      }
    } else {
      this.router.navigate(['/login']);
      alert('Debes iniciar sesión para solicitar clubs');
    }
  }
}
