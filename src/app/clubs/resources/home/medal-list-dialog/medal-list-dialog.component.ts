import { Component, EventEmitter, Output } from '@angular/core';
import { MedalListComponent } from '../../../../shared/components/medal-list/medal-list.component';
import { MedalsResponseModel } from '../../../../core/data/models';

@Component({
  selector: 'app-medal-list-dialog',
  standalone: true,
  imports: [MedalListComponent],
  templateUrl: './medal-list-dialog.component.html',
  styleUrl: './medal-list-dialog.component.css',
})
export class MedalListDialogComponent {
  @Output() close = new EventEmitter<void>();
  protected medals: MedalsResponseModel[] = [];

  onClose() {
    this.close.emit();
  }
}
