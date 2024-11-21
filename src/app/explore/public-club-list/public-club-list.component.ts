import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Club } from '../../core/domain/entities';
import { ClubsService } from '../../core/services/clubs.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { ClubsSharedService } from '../../core/services/clubs-shared.service';

@Component({
  selector: 'app-public-club-list',
  standalone: true,
  imports: [CommonModule, ExecutedProcessDialogComponent],
  templateUrl: './public-club-list.component.html',
  styleUrl: './public-club-list.component.css',
})
export class PublicClubListComponent {
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;
  private isPublicClub: boolean = false;
  constructor(
    private clubsService: ClubsService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private clubsSharedService: ClubsSharedService
  ) {}
  @Input() clubs: Club[] = [];

  public clubRequest(id_club: number, is_private: boolean) {
    const userId = Number(this.localStorageService.getUserId());
    if (is_private) {
      this.clubsService.privateClubRequest(userId, id_club).subscribe({
        next: (res) => {
          this.updatePublicClubs();
          this.dialogMessage = 'Solicitud enviada correctamente';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
        error: (err) => {
          this.dialogMessage = 'No se ha podido enviar la solicitud';
          this.dialogActionText = 'Reintentar';
          this.showDialog = true;
        },
      });
    } else {
      this.clubsService.publicClubRequest(userId, id_club).subscribe({
        next: (res) => {
          this.updatePublicClubs();
          this.isPublicClub = true;
          this.dialogMessage = 'Te has unido al club correctamente';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
        error: (err) => {
          this.dialogMessage = 'No se ha podido unir al club';
          this.dialogActionText = 'Reintentar';
          this.showDialog = true;
        },
      });
    }
  }

  private updatePublicClubs(): void {
    this.clubsService
      .getAllClubs(this.localStorageService.getUserId())
      .subscribe({
        next: (res) => {
          this.clubsSharedService.updatePublicClubs(res);
        },
        error: (err) => {
          this.dialogMessage = 'No se ha podido cargar la lista de clubs';
          this.dialogActionText = 'Reintentar';
          this.showDialog = true;
        },
      });
  }

  public closeDialog(): void {
    this.showDialog = false;
    if (this.isPublicClub) {
      this.router.navigate(['/clubs']);
    }
  }
}
