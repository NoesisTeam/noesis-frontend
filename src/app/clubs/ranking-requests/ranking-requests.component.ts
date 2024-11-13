import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface RankingUser {
  user_name: string;
  points: number;
}

interface UserRequest {
  id_user: number;
  user_name: string;
}

@Component({
  selector: 'app-ranking-requests',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ranking-requests.component.html',
  styleUrl: './ranking-requests.component.css',
})
export class RankingRequestsComponent {
  rankingUsers: RankingUser[] = [
    { user_name: 'Pepito Pérez', points: 3300 },
    { user_name: 'Pepito Pérez', points: 3200 },
    { user_name: 'Pepito Pérez', points: 3100 },
    { user_name: 'Pepito Pérez', points: 3000 },
    { user_name: 'Pepito Pérez', points: 2900 },
  ];

  requestUsers: UserRequest[] = [
    {
      id_user: 1,
      user_name: 'Juan Gómez',
    },
    {
      id_user: 2,
      user_name: 'Juan Gómez',
    },
    {
      id_user: 3,
      user_name: 'Juan Gómez',
    },
    {
      id_user: 4,
      user_name: 'Juan Gómez',
    },
    {
      id_user: 5,
      user_name: 'Juan Gómez',
    },
  ];

  currentView: 'ranking' | 'requests' = 'ranking';

  changeView(view: 'ranking' | 'requests') {
    this.currentView = view;
  }

  rejectRequest(user: UserRequest) {
    alert('Request rejected');
  }

  acceptRequest(user: UserRequest) {
    alert('Request accepted');
  }
}
