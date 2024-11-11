import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private router: Router) {
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

  onSubmit(): void {}
}
