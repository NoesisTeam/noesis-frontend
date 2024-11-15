import { Component } from '@angular/core';
import { RankingRequestsComponent } from '../../../ranking-requests/ranking-requests.component';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-resource-detail-home',
  standalone: true,
  imports: [RankingRequestsComponent, PdfViewerComponent],
  templateUrl: './resource-detail-home.component.html',
  styleUrl: './resource-detail-home.component.css',
})
export class ResourceDetailHomeComponent {}
