import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-add-resource-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-resource-dialog.component.html',
  styleUrl: './add-resource-dialog.component.css',
})
export class AddResourceDialogComponent {
  readingResourceForm: FormGroup;
  selectedFile: File | null = null;
  fileError: boolean = false;

  @Output() close = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.readingResourceForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  validatePdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      if (this.validatePdfFile(file)) {
        this.selectedFile = file;
        this.fileError = false;
      } else {
        this.selectedFile = null;
        this.fileError = true;
        input.value = '';
      }
    }
  }
  isFormValid(): boolean {
    return this.readingResourceForm.valid && this.selectedFile !== null;
  }

  onClose() {
    this.close.emit();
  }

  onSubmit(): void {}
}
