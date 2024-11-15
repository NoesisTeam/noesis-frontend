import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent implements OnChanges {
  constructor(private authService: AuthService, private router: Router) {}

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
    club_status: string;
  }[] = [];

  visibleClubs: typeof this.clubs = [];
  currentStartIndex: number = 0;
  clubsPerPage: number = 4;

  ngOnInit() {
    this.updateVisibleClubs();
  }

  // Detects changes in clubs and updates the view
  ngOnChanges(changes: SimpleChanges) {
    if (changes['clubs'] && changes['clubs'].currentValue) {
      this.updateVisibleClubs();
    }
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

  getTokenClub(club_id: number) {
    console.log(club_id);
    const userId = this.authService.getUserId();
    if (userId != null) {
      this.authService.generateToken(userId, club_id).subscribe({
        next: (res) => {
          this.authService.setToken(res.access_token);
          this.router.navigate(['/clubs/resources']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Credenciales Incorrectas');
        },
      });
    } else {
      alert('Por favor iniciar sesión');
    }
  }
}
