import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../../../shared/components/create-club-dialog/create-club-dialog.component';
import { Club } from '../../../core/domain/entities';
import { ClubListComponent } from '../club-list/club-list.component';
import { ClubsService } from '../../../core/services/clubs.service';
import { ClubsSharedService } from '../../../core/services/clubs-shared.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-clubs-home',
  standalone: true,
  imports: [CommonModule, CreateClubDialogComponent, ClubListComponent],
  templateUrl: './clubs-home.component.html',
  styleUrl: './clubs-home.component.css',
})
export class ClubsHomeComponent implements OnInit {
  constructor(
    private clubsService: ClubsService,
    private clubsSharedService: ClubsSharedService,
    private localstorageService: LocalStorageService
  ) {}

  clubsCreated: Club[] = [];
  clubsJoined: Club[] = [];

  isDialogOpen = false;

  ngOnInit() {
    this.localstorageService.clearToken();
    this.clubsService
      .getFoundedClubs(this.localstorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.clubsCreated = data;
        },
        error: (error) => {
          console.error('Error al obtener los clubs fundados:', error);
        },
      });

    this.clubsService
      .getJoinedClubs(this.localstorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.clubsJoined = data;
        },
        error: (error) => {
          console.error(
            'Error al obtener los clubs a los que te has unido:',
            error
          );
        },
      });

    // Subscribe to changes in clubsCreated
    this.clubsSharedService.clubsCreated$.subscribe((clubs) => {
      this.clubsCreated = clubs;
    });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
