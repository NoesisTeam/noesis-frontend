import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AddResourceDialogComponent } from '../add-resource-dialog/add-resource-dialog.component';

@Component({
  selector: 'app-clubs-resources',
  standalone: true,
  imports: [CommonModule, RouterLink, AddResourceDialogComponent],
  templateUrl: './clubs-resources.component.html',
  styleUrls: ['./clubs-resources.component.css'],
})
export class ClubsResourcesComponent {
  isDialogOpen = false;

  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }
}
