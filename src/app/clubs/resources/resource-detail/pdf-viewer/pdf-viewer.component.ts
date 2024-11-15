import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css',
})
export class PdfViewerComponent {
  /** Input to accept the PDF source URL */
  @Input() pdfSrc!: string;

  /** Optional zoom level */
  zoom = 1.0;

  constructor() {}
}
