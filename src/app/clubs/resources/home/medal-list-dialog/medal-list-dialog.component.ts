import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MedalListComponent } from '../../../../shared/components/medal-list/medal-list.component';
import { MedalsResponseModel } from '../../../../core/data/models';
import { MedalsService } from '../../../../core/services/medals.service';
import { ExecutedProcessDialogComponent } from '../../../../shared/components/executed-process-dialog/executed-process-dialog.component';

@Component({
  selector: 'app-medal-list-dialog',
  standalone: true,
  imports: [MedalListComponent, ExecutedProcessDialogComponent],
  templateUrl: './medal-list-dialog.component.html',
  styleUrl: './medal-list-dialog.component.css',
})
export class MedalListDialogComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  protected medals: MedalsResponseModel[] = [];
  protected dialogMessage: string = '';
  protected dialogActionText: string = '';
  protected showDialog: boolean = false;

  constructor(private medalsService: MedalsService) {}

  ngOnInit(): void {
    this.medalsService.getMedalsByClub().subscribe({
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
  protected onClose() {
    this.close.emit();
  }

  protected closeExecutedProcessDialog(): void {
    this.showDialog = false;
  }
}
