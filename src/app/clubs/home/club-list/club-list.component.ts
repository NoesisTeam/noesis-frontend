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
import { ExecutedProcessDialogComponent } from '../../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { FilterPipe } from "../../../pipes/filter-by-pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-club-list',
  standalone: true,
  imports: [CommonModule, ExecutedProcessDialogComponent, FilterPipe,
    FormsModule],
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css'],
})
export class ClubListComponent implements OnChanges, AfterViewInit {
  @Input() isFounder: boolean = false;
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
  randomPhrase: string = '';

  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  properties!: string;
  filterProperty = '';

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

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
          this.dialogMessage = 'No se pudo ingresar al club';
          this.dialogActionText = 'Reintentar';
          this.showDialog = true;
        },
      });
    } else {
      this.dialogMessage = 'Por favor iniciar sesión';
      this.dialogActionText = 'Iniciar sesión';
      this.showDialog = true;
    }
  }

  getRandomPhrase(): string {
    const randomIndex = Math.floor(Math.random() * motivationalPhrases.length);
    return motivationalPhrases[randomIndex];
  }

  public closeDialog(): void {
    this.showDialog = false;
    if (this.dialogActionText === 'Iniciar sesión') {
      this.router.navigate(['/login']);
    }
  }
}
