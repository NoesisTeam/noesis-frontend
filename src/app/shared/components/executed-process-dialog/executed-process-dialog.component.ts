import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-executed-process-dialog',
  standalone: true,
  imports: [],
  templateUrl: './executed-process-dialog.component.html',
  styleUrl: './executed-process-dialog.component.css',
})
export class ExecutedProcessDialogComponent {
  @Input() message: string = 'Mensaje por defecto';
  @Input() actionText: string = 'Aceptar';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}