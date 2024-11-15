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
import { ResourcesService } from '../../../../core/services/resources.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private resourcesService: ResourcesService
  ) {
    this.readingResourceForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      references: ['', Validators.required],
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

  onSubmit(): void {
    if (!this.selectedFile) {
      // Manejo de error: el archivo no está seleccionado
      this.fileError = true;
      alert('Por favor selecciona un archivo PDF antes de enviar.');
      return;
    }

    const formData = new FormData();
    formData.append(
      'title',
      this.readingResourceForm.get('title')?.value || ''
    );
    formData.append(
      'author',
      this.readingResourceForm.get('author')?.value || ''
    );
    formData.append(
      'biblio_ref',
      this.readingResourceForm.get('references')?.value || ''
    );
    formData.append('reading_res_desc', '');
    formData.append('file', this.selectedFile as File);
    this.resourcesService.addResource(formData).subscribe({
      next: (res) => {
        alert(res.message);
        this.onClose();
        this.router.navigate(['/clubs/resources']);
      },
      error: (err) => {
        console.error('Add resource request failed', err);
        alert('No se pudo cargar el recurso');
      },
    });
  }
}
