import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AddResourceDialogComponent } from '../add-resource-dialog/add-resource-dialog.component';
import { RankingRequestsComponent } from '../../../ranking-requests/ranking-requests.component';
import { ReadingResource } from '../../../../core/domain/entities/reading-resource.entity';
import { ResourcesService } from '../../../../core/services/resources.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourceListComponent } from '../resource-list/resource-list.component';

@Component({
  selector: 'app-clubs-resources',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddResourceDialogComponent,
    ResourceListComponent,
    RankingRequestsComponent,
  ],
  templateUrl: './resources-home.component.html',
  styleUrls: ['./resources-home.component.css'],
})
export class ResourcesHomeComponent implements OnInit {
  constructor(
    private resourcesService: ResourcesService,
    private router: Router
  ) {}
  isDialogOpen = false;
  resources: ReadingResource[] = [];

  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  ngOnInit(): void {
    this.resourcesService
      .getClubResources()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            alert(
              'Permisos insuficientes para acceder a los recursos del club'
            );
            this.router.navigateByUrl('/clubs');
          }
          if (error.status === 401) {
            alert('Sesión expirada. Inicie sesión nuevamente');
            this.router.navigateByUrl('/login');
          } else {
            alert(
              `Error: ${
                error.error
                  ? error.error
                  : 'Ocurrió un error al obtener los recursos'
              }`
            );
          }
          return of([]);
        })
      )
      .subscribe((data) => {
        this.resources = data;
      });
  }

  resourcesTest: ReadingResource[] = [
    {
      id_club: 1,
      title: 'Exploring the Cosmos',
      author: 'Jane Doe',
      biblio_ref: 'Doe, J. (2024). Exploring the Cosmos. Sci-Fi Publishing.',
      reading_res_desc:
        'An insightful journey into the wonders of the universe.',
      created_at: '2024-11-01T10:00:00Z',
      url_resource: 'https://example.com/resources/exploring-the-cosmos',
      resource_status: 'active',
      id_reading_resource: 2,
    },
    {
      id_club: 2,
      title: 'Mastering Angular',
      author: 'John Smith',
      biblio_ref: 'Smith, J. (2023). Mastering Angular. WebDev Books.',
      reading_res_desc: 'A comprehensive guide to Angular development.',
      created_at: '2024-10-15T14:30:00Z',
      url_resource: 'https://example.com/resources/mastering-angular',
      resource_status: 'archived',
      id_reading_resource: 2,
    },
    {
      id_club: 3,
      title: 'The Art of Farming',
      author: 'Emily Green',
      biblio_ref: 'Green, E. (2022). The Art of Farming. Agriculture Press.',
      created_at: '2024-09-21T09:15:00Z',
      url_resource: 'https://example.com/resources/the-art-of-farming',
      resource_status: 'active',
      id_reading_resource: 2,
    },
    {
      id_club: 4,
      title: 'AI and the Future',
      author: 'Michael Johnson',
      biblio_ref: 'Johnson, M. (2025). AI and the Future. Tech World.',
      reading_res_desc:
        'A visionary look at artificial intelligence and its impact.',
      created_at: '2024-10-10T16:45:00Z',
      url_resource: 'https://example.com/resources/ai-and-the-future',
      resource_status: 'pending',
      id_reading_resource: 2,
    },
    {
      id_club: 5,
      title: 'Cooking Simplified',
      author: 'Sarah Baker',
      biblio_ref: 'Baker, S. (2023). Cooking Simplified. Home Chef Editions.',
      created_at: '2024-11-08T12:00:00Z',
      url_resource: 'https://example.com/resources/cooking-simplified',
      resource_status: 'active',
      id_reading_resource: 2,
    },
    {
      id_club: 1,
      title: 'Exploring the Cosmos',
      author: 'Jane Doe',
      biblio_ref: 'Doe, J. (2024). Exploring the Cosmos. Sci-Fi Publishing.',
      reading_res_desc:
        'An insightful journey into the wonders of the universe.',
      created_at: '2024-11-01T10:00:00Z',
      url_resource: 'https://example.com/resources/exploring-the-cosmos',
      resource_status: 'active',
      id_reading_resource: 2,
    },
    {
      id_club: 2,
      title: 'Mastering Angular',
      author: 'John Smith',
      biblio_ref: 'Smith, J. (2023). Mastering Angular. WebDev Books.',
      reading_res_desc: 'A comprehensive guide to Angular development.',
      created_at: '2024-10-15T14:30:00Z',
      url_resource: 'https://example.com/resources/mastering-angular',
      resource_status: 'archived',
      id_reading_resource: 2,
    },
  ];
}
