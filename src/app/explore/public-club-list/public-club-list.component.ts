import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Club } from '../../core/domain/entities';

@Component({
  selector: 'app-public-club-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './public-club-list.component.html',
  styleUrl: './public-club-list.component.css',
})
export class PublicClubListComponent {
  @Input() clubs: Club[] = [];
}
