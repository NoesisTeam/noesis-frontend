import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateClubDialogComponent } from '../../clubs/home/create-club-dialog/create-club-dialog.component';
import { Club } from '../../core/domain/entities';
import { PublicClubListComponent } from '../public-club-list/public-club-list.component';
import { ClubsService } from '../../core/services/clubs.service';

@Component({
  selector: 'app-explore-home',
  standalone: true,
  imports: [CommonModule, CreateClubDialogComponent, PublicClubListComponent],
  templateUrl: './explore-home.component.html',
  styleUrl: './explore-home.component.css',
})
export class ExploreHomeComponent implements OnInit {
  constructor(private clubsService: ClubsService) {}

  clubList: Club[] = [];
  ngOnInit(): void {
    this.clubsService
      .getAllClubs(String(this.clubsService.getUserId()))
      .subscribe({
        next: (data) => {
          this.clubList = data;
          console.log('Explore club list', data);
        },
        error: (error) => {
          console.error('Explore club error', error);
        },
      });
  }
  isDialogOpen = false;
  clubsTest: Club[] = [
    {
      id_club: 1,
      club_code: 'CHESS01',
      club_name: 'Club de Ajedrez',
      club_desc: 'Espacio para amantes del ajedrez y estrategia',
      is_private: false,
      is_academic: true,
      created_at: '2023-05-15',
      club_status: 'active',
    },
    {
      id_club: 2,
      club_code: 'DEBATE02',
      club_name: 'Sociedad de Debate',
      club_desc: 'Grupo dedicado al arte de la argumentación',
      is_private: true,
      is_academic: true,
      created_at: '2023-08-22',
      club_status: 'active',
    },
    {
      id_club: 3,
      club_code: 'MUSIC03',
      club_name: 'Club de Música',
      club_desc: 'Para entusiastas de la música y la interpretación',
      is_private: false,
      is_academic: false,
      created_at: '2023-03-10',
      club_status: 'inactive',
    },
    {
      id_club: 4,
      club_code: 'SCIENCE04',
      club_name: 'Club de Ciencias',
      club_desc: 'Explorando los misterios del universo',
      is_private: false,
      is_academic: true,
      created_at: '2024-01-05',
      club_status: 'active',
    },
    {
      id_club: 5,
      club_code: 'ART05',
      club_name: 'Club de Arte',
      club_desc: 'Expresión artística y creatividad',
      is_private: true,
      is_academic: false,
      created_at: '2023-11-30',
      club_status: 'pending',
    },
    {
      id_club: 6,
      club_code: 'SPORTS06',
      club_name: 'Club Deportivo',
      club_desc: 'Actividades deportivas y competencias',
      is_private: false,
      is_academic: false,
      created_at: '2023-09-18',
      club_status: 'active',
    },
    {
      id_club: 7,
      club_code: 'TECH07',
      club_name: 'Club de Tecnología',
      club_desc: 'Innovación y desarrollo tecnológico',
      is_private: true,
      is_academic: true,
      created_at: '2024-02-01',
      club_status: 'active',
    },
    {
      id_club: 8,
      club_code: 'PHOTO08',
      club_name: 'Club de Fotografía',
      club_desc: 'Capturando momentos a través del lente',
      is_private: false,
      is_academic: false,
      created_at: '2023-07-12',
      club_status: 'inactive',
    },
    {
      id_club: 9,
      club_code: 'LIT09',
      club_name: 'Club Literario',
      club_desc: 'Amantes de la literatura y escritura creativa',
      is_private: true,
      is_academic: true,
      created_at: '2023-12-05',
      club_status: 'active',
    },
    {
      id_club: 10,
      club_code: 'ECO10',
      club_name: 'Club de Ecología',
      club_desc: 'Compromiso con el medio ambiente',
      is_private: false,
      is_academic: true,
      created_at: '2024-01-20',
      club_status: 'pending',
    },
  ];

  openDialog() {
    this.isDialogOpen = true;
  }

  closeDialog() {
    this.isDialogOpen = false;
  }
}
