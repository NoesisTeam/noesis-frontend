import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { MedalListComponent } from '../../shared/components/medal-list/medal-list.component';
import { MedalsResponseModel } from '../../core/data/models';
import { MedalsService } from '../../core/services/medals.service';
import { LocalStorageService } from '../../core/services';
import { ExecutedProcessDialogComponent } from '../../shared/components/executed-process-dialog/executed-process-dialog.component';
import { UserService } from '../../core/services/user.service';
import { Career } from '../../core/domain/entities';
import { Sex } from '../../core/data/models/sex-list.model';

@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [NgIf, MedalListComponent, ExecutedProcessDialogComponent, CommonModule],
  templateUrl: './profile-home.component.html',
  styleUrl: './profile-home.component.css',
})
export class ProfileHomeComponent implements OnInit {
  public medals: MedalsResponseModel[] = [];
  public globalScore: number = 0;
  public dialogMessage: string = '';
  public dialogActionText: string = '';
  public showDialog: boolean = false;
  public careers: Career[] = [];
  public sexs: Sex[] = [
    { id_sex: 'M', sex_name: 'Masculino' },
    { id_sex: 'F', sex_name: 'Femenino' },
    { id_sex: 'O', sex_name: 'Otro' }
  ];

  fullName = '';
  semester = '';
  phoneNumber = '';
  sex = 'Selecciona';
  career_name = 'Selecciona una carrera';

  constructor(
    private medalsService: MedalsService,
    private userService: UserService,
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
    
      this.medalsService
      .getUserGlobalScore(this.localStorageService.getUserId())
      .subscribe({
        next: (data) => {
          this.globalScore = data.global_score;

          if (data.real_name != null){  
            this.fullName = data.real_name;
          }

          if (data.semester != null){
            this.semester = data.semester;
          }

          if (data.phone_number != null){
            this.phoneNumber = data.phone_number;
          }

          if (data.sex != null){
            this.sex = data.sex;
          }

          if (data.career_name != null){
            this.career_name = data.career_name;
          }
        },
        error: (error) => {
          this.dialogMessage = 'Error al obtener el puntaje global';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
      });

      this.userService
      .getAllCareers()
      .subscribe({
        next: (data) => {
          this.careers = data
        },
        error: (error) => {
          this.dialogMessage = 'Error al obtener el listado de carreras';
          this.dialogActionText = 'Aceptar';
          this.showDialog = true;
        },
      });
  }

  protected closeDialog(): void {
    this.showDialog = false;
  }
}
