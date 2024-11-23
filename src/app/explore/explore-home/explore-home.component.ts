import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../../shared/components/create-club-dialog/create-club-dialog.component';
import { PublicClubListComponent } from '../public-club-list/public-club-list.component';
import { ClubsService } from '../../core/services/clubs.service';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ClubsSharedService } from '../../core/services/clubs-shared.service';
import { Club } from '../../core/domain/entities';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';

@Component({
  selector: 'app-explore-home',
  standalone: true,
  imports: [
    CommonModule,
    CreateClubDialogComponent,
    PublicClubListComponent,
    ExecutedProcessDialogComponent,
  ],
  templateUrl: './explore-home.component.html',
  styleUrl: './explore-home.component.css',
})
export class ExploreHomeComponent implements OnInit {
  public isDialogOpen: boolean = false;
  public clubList: Club[] = [];
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  constructor(
    private readonly clubsService: ClubsService,
    private readonly localStorageService: LocalStorageService,
    private readonly clubsSharedService: ClubsSharedService
  ) {}

  public ngOnInit(): void {
    this.loadClubs();
  }

  /**
   * Opens the club creation dialog
   */
  public openDialog(): void {
    this.isDialogOpen = true;
  }

  /**
   * Close the club creation dialog
   */
  public closeDialog(): void {
    this.isDialogOpen = false;
  }

  /**
   * Load the list of available clubs
   */
  private loadClubs(): void {
    this.clubsService
      .getAllClubs(this.localStorageService.getUserId())
      .subscribe({
        next: (data: Club[]) => {
          this.clubList = data;
        },
        error: (error) => {
          this.dialogMessage = 'Error al cargar clubs';
          this.dialogActionText = 'Reintentar';
          this.showDialog = true;
        },
      });
    this.clubsSharedService.publicClubs$.subscribe((clubs) => {
      this.clubList = clubs;
    });
  }

  public closeExecutedDialog(): void {
    this.showDialog = false;
  }
}
