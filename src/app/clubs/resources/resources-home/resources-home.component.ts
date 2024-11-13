import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddResourceDialogComponent } from '../add-resource-dialog/add-resource-dialog.component';
import { RankingRequestsComponent } from '../../ranking-requests/ranking-requests.component';

@Component({
  selector: 'app-clubs-resources',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddResourceDialogComponent,
    RankingRequestsComponent,
  ],
  templateUrl: './resources-home.component.html',
  styleUrls: ['./resources-home.component.css'],
})
export class ResourcesHomeComponent {
  isDialogOpen = false;

  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
