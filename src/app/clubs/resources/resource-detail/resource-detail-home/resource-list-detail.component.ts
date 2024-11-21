import { Component, OnInit } from '@angular/core';
import { RankingRequestsComponent } from '../../../ranking-requests/ranking-requests.component';
import { PdfViewerComponent } from '../pdf-viewer/pdf-viewer.component';
import { ResourcesService } from '../../../../core/services/resources.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../../core/services/local-storage.service';

@Component({
  selector: 'app-resource-detail-home',
  standalone: true,
  imports: [RankingRequestsComponent, PdfViewerComponent],
  templateUrl: './resource-detail-home.component.html',
  styleUrl: './resource-detail-home.component.css',
})
export class ResourceDetailHomeComponent implements OnInit {
  constructor(
    private resourcesServices: ResourcesService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  readingResourceUrl: string = '';
  ngOnInit(): void {
    this.resourcesServices.getReadingResourceUrl().subscribe({
      next: (data) => {
        this.readingResourceUrl = data;
      },
      error: (error) => {
        console.error('Error al obtener url del recurso', error);
      },
    });
  }

  getQuiz() {
    this.router.navigate(['clubs/resources/detail/quiz']);
  }

  backButtonAction() {
    this.localStorageService.clearResourceId();
    this.router.navigate(['clubs/resources']);
  }
}
