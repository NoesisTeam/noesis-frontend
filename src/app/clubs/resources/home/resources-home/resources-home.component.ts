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
}
