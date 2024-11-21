import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClubsService } from '../../../core/services/clubs.service';
import { ExecutedProcessDialogComponent } from '../executed-process-dialog/executed-process-dialog.component';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClubsSharedService } from '../../../core/services/clubs-shared.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';

@Component({
  selector: 'app-create-club-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExecutedProcessDialogComponent],
  templateUrl: './create-club-dialog.component.html',
  styleUrls: ['./create-club-dialog.component.css'],
})
export class CreateClubDialogComponent {
  public createClubForm: FormGroup;
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;

  @Output() close = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private clubsService: ClubsService,
    private clubsSharedService: ClubsSharedService,
    private localStorageService: LocalStorageService
  ) {
    this.createClubForm = this.formBuilder.group({
      isAcademic: [false],
      clubName: ['', Validators.required],
      clubType: ['Público', Validators.required],
    });
  }

  isFormValid(): boolean {
    return this.createClubForm.valid;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit(): void {
    const id_user = Number(this.localStorageService.getUserId()) ?? 0;
    const is_academic = this.createClubForm.get('isAcademic')?.value ?? false;
    const club_name = this.createClubForm.get('clubName')?.value;
    const club_desc = '';
    const is_private = this.createClubForm.get('clubType')?.value === 'Privado';

    this.clubsService
      .createClub(id_user, is_academic, club_name, club_desc, is_private)
      .subscribe({
        next: (response) => {
          this.dialogMessage = 'Club creado exitosamente';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;

          // Update the clubsCreated array in the shared service
          this.clubsService
            .getFoundedClubs(this.localStorageService.getUserId())
            .subscribe({
              next: (data) => {
                this.clubsSharedService.updateClubsCreated(data);
              },
              error: (error) => {
                console.error('Error al obtener los clubs fundados:', error);
              },
            });
          // this.router.navigate(['/clubs']);
        },
        error: (error) => {
          console.log(error.message);
        },
      });
  }

  public closeExecutedProcessDialog(): void {
    this.showDialog = false;
    this.onClose();
  }
}
