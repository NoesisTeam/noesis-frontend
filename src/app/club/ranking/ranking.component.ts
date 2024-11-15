import { Component } from '@angular/core';
import { NgClass, NgForOf, NgIf } from '@angular/common';

interface User {
  name: string;
  points: number;
}

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf,
  ],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.css'
})
export class RankingComponent {
  rankingUsers: User[] = [
    { name: 'Pepito Pérez', points: 3300 },
    { name: 'Pepito Pérez', points: 3200 },
    { name: 'Pepito Pérez', points: 3100 },
    { name: 'Pepito Pérez', points: 3000 },
    { name: 'Pepito Pérez', points: 2900 }
  ];

  requestUsers: User[] = [
    { name: 'Juan García', points: 2800 },
    { name: 'María López', points: 2700 },
    { name: 'Carlos Martínez', points: 2600 }
  ];

  currentView: 'ranking' | 'requests' = 'ranking';
  userRole: 'fundador' | 'miembro' = 'miembro'; // Cambia este valor según el rol

  changeView(view: 'ranking' | 'requests') {
    this.currentView = view;
  }

  rejectRequest(user: User) {
    alert("Request rejected");
  }

  acceptRequest(user: User) {
    alert("Request accepted");
  }
}
