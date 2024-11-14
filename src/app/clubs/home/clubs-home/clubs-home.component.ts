import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../create-club-dialog/create-club-dialog.component';
import { Club } from '../../../core/domain/entities';
import { ClubListComponent } from '../club-list/club-list.component';
import { ClubsService } from '../../../core/services/clubs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clubs-home',
  standalone: true,
  imports: [CommonModule, CreateClubDialogComponent, ClubListComponent],
  templateUrl: './clubs-home.component.html',
  styleUrl: './clubs-home.component.css',
})
export class ClubsHomeComponent implements OnInit {
  constructor(private clubsService: ClubsService) {}

  clubsCreated: Club[] = [];
  clubsJoined: Club[] = [];

  isDialogOpen = false;

  ngOnInit() {
    this.clubsService
      .getFoundedClubs(String(this.clubsService.getUserId()))
      .subscribe({
        next: (data) => {
          this.clubsCreated = data;
          console.log('Data clubs created', data);
        },
        error: (error) => {
          console.error('Error al obtener los clubs fundados:', error);
        },
      });

    this.clubsService
      .getJoinedClubs(String(this.clubsService.getUserId()))
      .subscribe({
        next: (data) => {
          this.clubsJoined = data;
          console.log('Data clubs joined', data);
        },
        error: (error) => {
          console.error(
            'Error al obtener los clubs a los que te has unido:',
            error
          );
        },
      });
  }

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
