import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../../core/services/requests.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { ClubRanking } from '../../core/data/models';
import { ClubRequest } from '../../core/domain/entities';

@Component({
  selector: 'app-ranking-requests',
  standalone: true,
  imports: [CommonModule, ExecutedProcessDialogComponent],
  templateUrl: './ranking-requests.component.html',
  styleUrl: './ranking-requests.component.css',
})
export class RankingRequestsComponent implements OnInit {
  @Input() isResource: boolean = false;
  userRole: string = 'Member';
  rankingUsers: ClubRanking[] = [];
  requestUsers: ClubRequest[] = [];
  currentView: 'ranking' | 'requests' = 'ranking';
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;
  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.authService.isTokenExpired()) {
      this.userRole = this.authService.getRoleFromToken();
      if (this.userRole === 'Founder') {
        this.getAllMemberRequests();
      }
      if (this.isResource) {
        this.getResourceRankingUsers();
      } else {
        this.getClubRankingUsers();
      }
    } else {
      this.dialogMessage = 'Sesión expirada. Inicie sesión nuevamente';
      this.dialogActionText = 'Iniciar sesión';
      this.showDialog = true;
    }
  }

  getResourceRankingUsers(): void {
    this.requestsService.getResourceRankingUsers().subscribe({
      next: (data) => {
        this.rankingUsers = data;
      },
      error: (error) => {
        this.dialogMessage = 'Error al obtener el ranking de usuarios';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
      },
    });
  }

  getClubRankingUsers(): void {
    this.requestsService.getClubRankingUsers().subscribe({
      next: (data) => {
        this.rankingUsers = data;
      },
      error: (error) => {
        this.dialogMessage = 'Error al obtener el ranking del club';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
      },
    });
  }

  getAllMemberRequests(): void {
    this.requestsService.getAllMemberRequests().subscribe({
      next: (data) => {
        this.requestUsers = data;
      },
      error: (error) => {
        this.dialogMessage = 'Error al obtener las solicitudes de membresía';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
      },
    });
  }

  changeView(view: 'ranking' | 'requests') {
    this.currentView = view;
  }

  approveMembership(user_id: number) {
    this.requestsService.approveMembership(user_id).subscribe({
      next: (data) => {
        this.dialogMessage = 'Solicitud de membresía aprobada';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
      },
      error: (error) => {
        this.dialogMessage = 'Error al aprobar la solicitud de membresía';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
      },
    });
  }

  rejectMembership(user_id: number) {
    this.requestsService.rejectMembership(user_id).subscribe({
      next: (data) => {
        this.dialogMessage = 'Solicitud de membresía rechazada';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
      },
      error: (error) => {
        this.dialogMessage = 'Error al rechazar la solicitud de membresía';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
      },
    });
  }

  closeDialog(): void {
    this.showDialog = false;
    if (this.dialogMessage === 'Sesión expirada. Inicie sesión nuevamente') {
      this.router.navigate(['/login']);
    }
  }
}
