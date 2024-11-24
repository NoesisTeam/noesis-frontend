import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { MedalListComponent } from '../../shared/components/medal-list/medal-list.component';
import { MedalsResponseModel } from '../../core/data/models';
import { MedalsService } from '../../core/services/medals.service';
import { LocalStorageService } from '../../core/services';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [NgIf, MedalListComponent, ExecutedProcessDialogComponent],
  templateUrl: './profile-home.component.html',
  styleUrl: './profile-home.component.css',
})
export class ProfileHomeComponent implements OnInit {
  public medals: MedalsResponseModel[] = [];
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  constructor(
    private medalsService: MedalsService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.medalsService
      .getUserMedals(this.localStorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.medals = data;
        },
        error: (error) => {
          this.dialogMessage = 'Error al obtener las medallas';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
      });
  }

  protected closeDialog(): void {
    this.showDialog = false;
  }
}
