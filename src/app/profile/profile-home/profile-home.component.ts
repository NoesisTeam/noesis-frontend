import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MedalListComponent } from '../../shared/components/medal-list/medal-list.component';
import { MedalsResponseModel } from '../../core/data/models';
import { MedalsService } from '../../core/services/medals.service';
import { LocalStorageService } from '../../core/services';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { UsersService } from '../../core/services/user.service';
import { Career } from '../../core/domain/entities';
import { Sex } from '../../core/data/models/sex-list.model';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  alphabeticValidator,
  semesterNumericValidator,
  phoneNumericValidator,
} from '../../core/validators/custom-validators';
import { ProfileFormErrorsModel } from '../../core/data/models/profile-form-errors.model';
import { Subject, takeUntil } from 'rxjs';
import { ProfileInfoUp } from '../../core/data/models/user-profile-update.model';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [
    NgIf,
    MedalListComponent,
    ExecutedProcessDialogComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile-home.component.html',
  styleUrl: './profile-home.component.css',
})
export class ProfileHomeComponent implements OnInit {
  public profileForm!: FormGroup;
  public formErrors: ProfileFormErrorsModel = {};
  public medals: MedalsResponseModel[] = [];
  public globalScore: number = 0;
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;
  public isSubmitting: boolean = false;
  public careers: Career[] = [];
  public sexs: Sex[] = [
    { id_sex: 'M', sex_name: 'Masculino' },
    { id_sex: 'F', sex_name: 'Femenino' },
    { id_sex: 'O', sex_name: 'Otro' },
  ];

  private readonly destroy$ = new Subject<void>();

  fullName = '';
  semester = '';
  phoneNumber = '';
  sex = 'Selecciona';
  career_name = 'Selecciona una carrera';

  constructor(
    private medalsService: MedalsService,
    private usersService: UsersService,
    private localStorageService: LocalStorageService,
    private formBuilder: FormBuilder
  ) {
    this.initForm();
  }

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

    this.medalsService
      .getUserGlobalScore(this.localStorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.globalScore = Math.floor(data.global_score * 10) / 10;

          if (data.real_name != null) {
            this.fullName = data.real_name;
          }

          if (data.semester != null) {
            this.semester = data.semester;
          }

          if (data.phone_number != null) {
            this.phoneNumber = data.phone_number;
          }

          if (data.sex != null) {
            this.sex = data.sex;
          }

          if (data.career_name != null) {
            this.career_name = data.career_name;
          }
        },
        error: (error) => {
          this.dialogMessage = 'Error al obtener el puntaje global';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
      });

    this.usersService.getAllCareers().subscribe({
      next: (data) => {
        this.careers = data;
      },
      error: (error) => {
        this.dialogMessage = 'Error al obtener el listado de carreras';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
      },
    });
  }

  private initForm(): void {
    this.profileForm = this.formBuilder.group({
      fullName: ['', [Validators.required, alphabeticValidator()]],
      careerName: [''],
      semester: ['', [Validators.required, semesterNumericValidator()]],
      phoneNumber: ['', [Validators.required, phoneNumericValidator()]],
      sex: [''],
    });

    this.profileForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onFormValueChanges());
  }

  private onFormValueChanges(): void {
    if (!this.profileForm) return;

    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      this.formErrors[field as keyof ProfileFormErrorsModel] = '';

      if (control && control.invalid && (control.dirty || control.touched)) {
        const messages = this.getValidationMessages(field, control.errors);
        this.formErrors[field as keyof ProfileFormErrorsModel] = messages[0];
      }
    });
  }

  public onSubmit(): void {
    if (this.profileForm.invalid) {
      this.validateAllFormFields();
      return;
    }

    this.isSubmitting = true;

    const { fullName, careerName, semester, phoneNumber, sex } =
      this.profileForm.value;

    const profileInfo: ProfileInfoUp = {
      id_user: Number(this.localStorageService.getUserId()),
      real_name: fullName,
      phone_number: phoneNumber,
      semester: Number(semester),
      id_career: Number(careerName),
      sex: sex,
    };

    this.usersService.updateProfile(profileInfo).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.dialogMessage = 'Perfil actualizado';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
      },
      error: (error) => {
        this.isSubmitting = false;
        this.dialogMessage =
          'Error. Por favor elige nuevamente tu carrera y tu sexo';
        this.dialogActionText = 'Aceptar';
        this.showDialog = true;
      },
    });
  }

  /**
   * Gets validation messages for form fields
   */
  private getValidationMessages(field: string, errors: any): string[] {
    const messages: string[] = [];

    if (errors?.required) messages.push('Campo obligatorio');
    if (errors?.alphabetic)
      messages.push(
        'Debe contener solo letras. Evite espacios al inicio, final y seguidos. Evite caracteres especiales'
      );
    if (errors?.semesterNumeric)
      messages.push('Debe contener solo números. Máximo dos dígitos');
    if (errors?.phoneNumeric) messages.push('Debe contener solo números');

    return messages;
  }

  /**
   * Validates all form fields
   */
  private validateAllFormFields(): void {
    Object.keys(this.profileForm.controls).forEach((field) => {
      const control = this.profileForm.get(field);
      control?.markAsTouched();
    });
  }

  protected closeDialog(): void {
    this.showDialog = false;
  }
}
