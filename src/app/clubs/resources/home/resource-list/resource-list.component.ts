import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReadingResource } from '../../../../core/domain/entities';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css',
})
export class ResourceListComponent {
  @Input() resources: ReadingResource[] = [];
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  setResourceId(id_reading_resource: number) {
    this.localStorageService.setResourceId(String(id_reading_resource));
    this.router.navigate(['/clubs/resources/detail']);
  }
}
