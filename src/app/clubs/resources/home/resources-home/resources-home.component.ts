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
import { AuthService } from '../../../../core/services/auth.service';
import { ResourcesSharedService } from '../../../../core/services/resources-shared.service';
import { ExecutedProcessDialogComponent } from '../../../../shared/components/executed-process-dialog/executed-process-dialog.component';

@Component({
  selector: 'app-clubs-resources',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    AddResourceDialogComponent,
    ResourceListComponent,
    RankingRequestsComponent,
    ExecutedProcessDialogComponent,
  ],
  templateUrl: './resources-home.component.html',
  styleUrls: ['./resources-home.component.css'],
})
export class ResourcesHomeComponent implements OnInit {
  userRole: string = '';
  isDialogOpen = false;
  resources: ReadingResource[] = [];
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;
  constructor(
    private resourcesService: ResourcesService,
    private router: Router,
    private authService: AuthService,
    private resourcesSharedService: ResourcesSharedService
  ) {}

  openDialog(): void {
    this.isDialogOpen = true;
  }

  closeDialog(): void {
    this.isDialogOpen = false;
  }

  ngOnInit(): void {
    this.userRole = this.authService.getRoleFromToken();
    this.resourcesService
      .getClubResources()
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.dialogMessage =
              'Permisos insuficientes para acceder a los recursos del club';
            this.dialogActionText = 'Aceptar';
            this.showDialog = true;
          }
          if (error.status === 401) {
            this.dialogMessage = 'Sesión expirada. Inicie sesión nuevamente';
            this.dialogActionText = 'Aceptar';
            this.showDialog = true;
          } else {
            this.dialogMessage = 'Ocurrió un error al obtener los recursos';
            this.dialogActionText = 'Reintentar';
            this.showDialog = true;
          }
          return of([]);
        })
      )
      .subscribe((data) => {
        this.resources = data;
      });
    this.resourcesSharedService.resourcesCreated$.subscribe((resources) => {
      this.resources = resources;
    });
  }

  public closeExecutionDialog(): void {
    this.showDialog = false;
    switch (this.dialogMessage) {
      case 'Permisos insuficientes para acceder a los recursos del club':
        this.router.navigateByUrl('/clubs');
        break;
      case 'Sesión expirada. Inicie sesión nuevamente':
        this.router.navigateByUrl('/login');
        break;
      case 'Ocurrió un error al obtener los recursos':
        this.ngOnInit();
        break;
      default:
        break;
    }
  }
}
