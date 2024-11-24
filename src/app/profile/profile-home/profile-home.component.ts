import { Component } from '@angular/core';
import { MedalListComponent } from '../../shared/components/medal-list/medal-list.component';
import { MedalsResponseModel } from '../../core/data/models';
@Component({
  selector: 'app-profile-home',
  standalone: true,
  imports: [MedalListComponent],
  templateUrl: './profile-home.component.html',
  styleUrl: './profile-home.component.css',
})
export class ProfileHomeComponent {
  public medals: MedalsResponseModel[] = [];
}
