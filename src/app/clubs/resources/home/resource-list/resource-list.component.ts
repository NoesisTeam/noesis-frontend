import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReadingResource } from '../../../../core/domain/entities';
import { ResourcesService } from '../../../../core/services/resources.service';
import { Router } from '@angular/router';

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
    private resourcesService: ResourcesService,
    private router: Router
  ) {}

  setResourceId(id_reading_resource: number) {
    this.resourcesService.setReadingResourceId(id_reading_resource);
    this.router.navigate(['/clubs/resources/detail']);
  }
}
