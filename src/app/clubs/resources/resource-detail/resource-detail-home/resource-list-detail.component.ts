import { Component, Input, OnInit } from '@angular/core';
import { RankingRequestsComponent } from '../../../ranking-requests/ranking-requests.component';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { ResourcesService } from '../../../../core/services/resources.service';

@Component({
  selector: 'app-resource-detail-home',
  standalone: true,
  imports: [RankingRequestsComponent, PdfViewerComponent],
  templateUrl: './resource-detail-home.component.html',
  styleUrl: './resource-detail-home.component.css',
})
export class ResourceDetailHomeComponent implements OnInit {
  constructor(private resourcesServices: ResourcesService) {}
  readingResourceUrl: string = '';
  ngOnInit(): void {
    this.resourcesServices.getReadingResourceUrl().subscribe({
      next: (data) => {
        console.log(data);
        this.readingResourceUrl = data.url_resource;
        console.log('Resource Detail', data);
      },
      error: (error) => {
        console.error('Error al obtener url del recurso', error);
      },
    });
  }
}
