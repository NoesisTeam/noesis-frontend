import { NgForOf, NgIf, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MedalsResponseModel } from '../../../core/data/models';
import { medalColours } from '../../constants/medal-colours';
@Component({
  selector: 'app-medal-list',
  standalone: true,
  imports: [NgForOf, NgIf, NgStyle],
  templateUrl: './medal-list.component.html',
  styleUrl: './medal-list.component.css',
})
export class MedalListComponent {
  @Input() isUserProfile: boolean = false;
  @Input() medals: MedalsResponseModel[] = [];

  protected getBackgroundColor(medalQuality: string): string {
    switch (medalQuality) {
      case 'Bronce':
        return medalColours[0];
      case 'Plata':
        return medalColours[1];
      case 'Diamante':
        return medalColours[2];
      default:
        return '#FFFFFF';
    }
  }
}
