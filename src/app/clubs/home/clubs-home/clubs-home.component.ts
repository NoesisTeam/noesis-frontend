import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../../../shared/components/create-club-dialog/create-club-dialog.component';
import { ClubListComponent } from '../club-list/club-list.component';
import { ClubsService } from '../../../core/services/clubs.service';
import { ClubsSharedService } from '../../../core/services/clubs-shared.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { Club } from '../../../core/domain/entities';

@Component({
  selector: 'app-clubs-home',
  standalone: true,
  imports: [CommonModule, CreateClubDialogComponent, ClubListComponent],
  templateUrl: './clubs-home.component.html',
  styleUrl: './clubs-home.component.css',
})
export class ClubsHomeComponent implements OnInit {
  properties!: string;
  filterProperty = '';

  constructor(
    private clubsService: ClubsService,
    private clubsSharedService: ClubsSharedService,
    private localstorageService: LocalStorageService
  ) {}

  clubsCreated: Club[] = [];
  clubsJoined: Club[] = [];
  public isDialogOpen: boolean = false;
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  ngOnInit() {
    this.localstorageService.clearToken();
    this.clubsService
      .getFoundedClubs(this.localstorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.clubsCreated = data;
        },
        error: (error) => {
          this.dialogMessage = 'Error al obtener los clubs fundados';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
      });

    this.clubsService
      .getJoinedClubs(this.localstorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.clubsJoined = data;
        },
        error: (error) => {
          this.dialogMessage =
            'Error al obtener los clubs a los que te has unido';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
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

  public closeExecutedDialog(): void {
    this.showDialog = false;
  }
}
