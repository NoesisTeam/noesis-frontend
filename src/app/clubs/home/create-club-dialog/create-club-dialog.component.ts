import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClubsService } from '../../../core/services/clubs.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-create-club-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-club-dialog.component.html',
  styleUrl: './create-club-dialog.component.css',
})
export class CreateClubDialogComponent {
  createClubForm: FormGroup;

  @Output() close = new EventEmitter<void>();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private clubsService: ClubsService
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
    const id_user = this.clubsService.getUserId() ?? 0;
    const is_academic = this.createClubForm.get('isAcademic')?.value ?? false;
    const club_name = this.createClubForm.get('clubName')?.value;
    const club_desc = '';
    const is_private = this.createClubForm.get('clubType')?.value === 'Privado';

    this.clubsService
      .createClub(id_user, is_academic, club_name, club_desc, is_private)
      .subscribe({
        next: (response) => {
          this.onClose();
          this.router.navigate(['/clubs']);
          alert('Club creado exitosamente');
        },
        error: (error) => {
          console.log(error.message);
        },
      });
  }
}
