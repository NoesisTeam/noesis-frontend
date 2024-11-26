import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Club } from '../../core/domain/entities';
import { ClubsService } from '../../core/services/clubs.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { ClubsSharedService } from '../../core/services/clubs-shared.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from "../../pipes/filter-by-pipe";
import { UsersService } from '../../core/services/user.service';

@Component({
  selector: 'app-public-club-list',
  standalone: true,
  imports: [CommonModule, ExecutedProcessDialogComponent, FormsModule, FilterPipe],
  templateUrl: './public-club-list.component.html',
  styleUrl: './public-club-list.component.css',
})
export class PublicClubListComponent {

  properties!: string;
  filterProperty = '';

  public dialogMessage: string = '';
  public dialogActionText: string = '';

  public showDialog: boolean = false;
  private isPublicClub: boolean = false;
  
  constructor(
    private clubsService: ClubsService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private clubsSharedService: ClubsSharedService,
    private usersService : UsersService
  ) {}
  @Input() clubs: Club[] = [];

  public clubRequest(id_club: number, is_private: boolean, is_academic: boolean) {
    const userId = Number(this.localStorageService.getUserId());
    let isValidUserRequest = false;
    if(is_academic){
      this.usersService.checkIsAcademicUser(String(userId)).subscribe({
        next: (res) => {
          if(res.complete){
            isValidUserRequest = true;
            this.handleRequest(isValidUserRequest, is_private, userId, id_club);
          }else{
            this.dialogMessage = 'Por favor completa tus datos para unirte a un club academico';
            this.dialogActionText = 'Aceptar';
            this.showDialog = true;
            this.router.navigate(['/profile']);
          }
        },
        error: (err) => {
          this.dialogMessage = 'No se ha podido verificar si cumples los requisitos para un club academico';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
      });
    }else{
      isValidUserRequest = true;
    }

    this.handleRequest(isValidUserRequest, is_private, userId, id_club);
  }

  private handleRequest(isValidUserRequest: boolean, is_private: boolean, userId: number, id_club: number) {
    if (isValidUserRequest && is_private) {
      this.handlePrivateRequest(userId, id_club);
    } else if (isValidUserRequest && !is_private) {
      this.handlePublicRequest(userId, id_club);
    }
  }

  private handlePublicRequest(userId: number, id_club: number) {
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

  private handlePrivateRequest(userId: number, id_club: number) {
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
