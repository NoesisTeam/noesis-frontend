import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Router } from '@angular/router';
import { motivationalPhrases } from '../../../shared/constants/motivational-phrases';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent implements OnChanges, AfterViewInit {
  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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
  @Input() isFounder: boolean = false;

  visibleClubs: typeof this.clubs = [];
  currentStartIndex: number = 0;
  clubsPerPage: number = 4;
  randomPhrase: string = '';

  ngOnInit() {
    this.updateVisibleClubs();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['clubs'] && changes['clubs'].currentValue) {
      this.updateVisibleClubs();
    }
  }

  ngAfterViewInit() {
    this.randomPhrase = this.getRandomPhrase();
    this.cdr.detectChanges();
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
    const userId = Number(this.localStorageService.getUserId());
    if (userId != null) {
      this.authService.generateToken(userId, club_id).subscribe({
        next: (res) => {
          this.localStorageService.setToken(res.access_token);
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

  getRandomPhrase(): string {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[randomIndex];
  }
}
