import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsService } from '../../core/services/requests.service';
import { ClubRequest } from '../../core/domain/entities';
import { Router } from '@angular/router';
import { RankingResponseModel } from '../../core/data/models';

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
    private router: Router
  ) {}

  userRole: string = 'Member';
  rankingUsers: RankingResponseModel[] = [];
  requestUsers: ClubRequest[] = [];
  currentView: 'ranking' | 'requests' = 'ranking';

  ngOnInit(): void {
    if (!this.requestsService.isTokenExpired()) {
      this.userRole = this.requestsService.getRoleFromToken();
      if (this.userRole === 'Founder') {
        this.getAllMemberRequests();
      }
      this.getRankingUsers();
    } else {
      alert('Sesión expirada. Inicie sesión nuevamente');
      this.router.navigate(['/login']);
    }
  }

  getRankingUsers(): void {
    this.requestsService.getRankingUsers().subscribe({
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
