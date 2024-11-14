import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ReadingResource } from '../../../../core/domain/entities';

@Component({
  selector: 'app-resource-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resource-list.component.html',
  styleUrl: './resource-list.component.css',
})
export class ResourceListComponent {
  @Input() resources: ReadingResource[] = [];
}
