import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../../core/services/requests.service';
import { ClubRequest } from '../../core/domain/entities';
import { Router } from '@angular/router';
import { RankingResponseModel } from '../../core/data/models';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-ranking-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-requests.component.html',
  styleUrl: './ranking-requests.component.css',
})
export class RankingRequestsComponent implements OnInit {
  constructor(
    private requestsService: RequestsService,
    private router: Router,
    private authService: AuthService
  ) {}

  @Input() isResource: boolean = false;
  userRole: string = 'Member';
  rankingUsers: RankingResponseModel[] = [];
  requestUsers: ClubRequest[] = [];
  currentView: 'ranking' | 'requests' = 'ranking';

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
      alert('Sesión expirada. Inicie sesión nuevamente');
      this.router.navigate(['/login']);
    }
  }

  getResourceRankingUsers(): void {
    this.requestsService.getResourceRankingUsers().subscribe({
      next: (data) => {
        this.rankingUsers = data;
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }

  getClubRankingUsers(): void {
    this.requestsService.getClubRankingUsers().subscribe({
      next: (data) => {
        this.rankingUsers = data;
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }

  getAllMemberRequests(): void {
    this.requestsService.getAllMemberRequests().subscribe({
      next: (data) => {
        this.requestUsers = data;
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }

  changeView(view: 'ranking' | 'requests') {
    this.currentView = view;
  }

  approveMembership(user_id: number) {
    this.requestsService.approveMembership(user_id).subscribe({
      next: (data) => {
        alert(data.message);
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }

  rejectMembership(user_id: number) {
    this.requestsService.rejectMembership(user_id).subscribe({
      next: (data) => {
        alert(data.message);
      },
      error: (error) => {
        console.log('Error: ', error);
      },
    });
  }
}
