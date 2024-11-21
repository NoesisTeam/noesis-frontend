import {
  Component,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ResourcesService } from '../../../../core/services/resources.service';
import { ExecutedProcessDialogComponent } from '../../../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { ResourcesSharedService } from '../../../../core/services/resources-shared.service';

@Component({
  selector: 'app-add-resource-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ExecutedProcessDialogComponent],
  templateUrl: './add-resource-dialog.component.html',
  styleUrl: './add-resource-dialog.component.css',
})
export class AddResourceDialogComponent {
  public readingResourceForm: FormGroup;
  public selectedFile: File | null = null;
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;
  public isSubmitting: boolean = false;
  public fileError: boolean = false;
  public fileSizeError: boolean = false;
  private readonly MAX_FILE_SIZE = 1024 * 1024;

  @Output() close = new EventEmitter<void>();
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private resourcesService: ResourcesService,
    private resourcesSharedService: ResourcesSharedService
  ) {
    this.readingResourceForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      references: ['', Validators.required],
    });
  }

  public triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  private validatePdfFile(file: File): boolean {
    return file.type === 'application/pdf';
  }

  public onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validate PDF file type
      if (!this.validatePdfFile(file)) {
        this.fileError = true;
        this.selectedFile = null;
        this.fileSizeError = false;
        return;
      }

      // Validate file size
      if (file.size > this.MAX_FILE_SIZE) {
        this.fileSizeError = true;
        this.selectedFile = null;
        this.fileError = false;
        return;
      }

      // If it passes both validations
      this.selectedFile = file;
      this.fileError = false;
      this.fileSizeError = false;
    }
  }

  public isFormValid(): boolean {
    return this.readingResourceForm.valid && this.selectedFile !== null;
  }

  public onClose() {
    this.close.emit();
  }

  public onSubmit(): void {
    if (!this.selectedFile) {
      // Error handling: file is not selected
      this.fileError = true;
      this.dialogMessage =
        'Por favor selecciona un archivo PDF antes de enviar.';
      this.dialogActionText = 'Aceptar';
      this.showDialog = true;
      return;
    }
    this.isSubmitting = true;
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
        this.resourcesService.getClubResources().subscribe({
          next: (resources) => {
            this.resourcesSharedService.updateResourcesCreated(resources);
          },
          error: (err) => {
            this.dialogMessage = 'Error al obtener los recursos';
            this.dialogActionText = 'Aceptar';
            this.showDialog = true;
          },
        });
        this.dialogMessage = 'Recurso cargado exitosamente';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
        this.isSubmitting = false;
      },
      error: (err) => {
        this.dialogMessage = 'No se pudo cargar el recurso';
        this.dialogActionText = 'Reintentar';
        this.showDialog = true;
        this.isSubmitting = false;
      },
    });
  }

  public closeExecutedProcessDialog(): void {
    if (this.dialogMessage === 'Recurso cargado exitosamente') {
      this.showDialog = false;
      this.onClose();
    } else {
      this.showDialog = false;
    }
  }
}
