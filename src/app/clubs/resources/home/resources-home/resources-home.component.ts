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
import { MedalListDialogComponent } from '../medal-list-dialog/medal-list-dialog.component';
import { RequestsService } from '../../../../core/services/requests.service';
import * as XLSX from 'xlsx';

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
    MedalListDialogComponent,
  ],
  templateUrl: './resources-home.component.html',
  styleUrls: ['./resources-home.component.css'],
})
export class ResourcesHomeComponent implements OnInit {
  protected userRole: string = '';
  protected isAddResourceDialogOpen = false;
  protected resources: ReadingResource[] = [];
  protected dialogMessage: string = '';
  protected dialogActionText: string = '';
  protected isExecutedProcessDialogOpen: boolean = false;
  protected isMedalListDialogOpen: boolean = false;

  constructor(
    private resourcesService: ResourcesService,
    private router: Router,
    private authService: AuthService,
    private resourcesSharedService: ResourcesSharedService,
    private requestsService: RequestsService
  ) {}

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
            this.isExecutedProcessDialogOpen = true;
          }
          if (error.status === 401) {
            this.dialogMessage = 'Sesión expirada. Inicie sesión nuevamente';
            this.dialogActionText = 'Aceptar';
            this.isExecutedProcessDialogOpen = true;
          } else {
            this.dialogMessage = 'Ocurrió un error al obtener los recursos';
            this.dialogActionText = 'Reintentar';
            this.isExecutedProcessDialogOpen = true;
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

  protected openAddResourceDialog(): void {
    this.isAddResourceDialogOpen = true;
  }

  protected closeAddResourceDialog(): void {
    this.isAddResourceDialogOpen = false;
  }

  protected closeExecutionDialog(): void {
    this.isExecutedProcessDialogOpen = false;
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

  protected openMedalListDialog(): void {
    this.isMedalListDialogOpen = true;
  }

  protected closeMedalListDialog(): void {
    this.isMedalListDialogOpen = false;
  }

  exportToExcel(): void{
    this.requestsService.getClubRankingUsers().subscribe({
      next: (data) => {
        // Crea una hoja de trabajo
        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
          
        // Crea un libro de trabajo
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Puntuaciones');
          
        // Genera y descarga el archivo Excel
        XLSX.writeFile(wb, 'ReporteRankingClub.xlsx');
        
      },
      error: (error) => {
        alert("No se pudo exportar");
        console.log(error);
      },
    });

  }
}
