import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule, PdfViewerModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css',
})
export class PdfViewerComponent implements OnInit {
  @Input() pdfSrc!: string;

  zoom: number = 1;
  tempZoomValue: string = '100'; // Stores the temporal zoom value
  isMaximized: boolean = false;
  viewerWidth: number = 1000;
  viewerHeight: number = 700;
  currentPage: number = 1;
  totalPages: number = 0;

  ngOnInit() {
    this.updateViewerSize();
  }

  zoomIn() {
    if (this.zoom < 3) {
      this.zoom += 0.1;
    }
  }

  zoomOut() {
    if (this.zoom > 0.5) {
      this.zoom -= 0.1;
      // Centering after changing the zoom
      setTimeout(() => this.centerPdf(), 100);
    }
  }

  toggleMaximize() {
    this.isMaximized = !this.isMaximized;
    this.updateViewerSize();
  }

  private updateViewerSize() {
    if (this.isMaximized) {
      this.viewerWidth = window.innerWidth - 40;
      this.viewerHeight = window.innerHeight - 100;
    } else {
      this.viewerWidth = 1000;
      this.viewerHeight = 700;
    }
  }

  // PDF centering function
  private centerPdf() {
    const container = document.querySelector('.pdf-container');
    if (container) {
      container.scrollTo({
        left: (container.scrollWidth - container.clientWidth) / 2,
        top: (container.scrollHeight - container.clientHeight) / 2,
        behavior: 'smooth',
      });
    }
  }

  updateZoom(event: Event) {
    const input = event.target as HTMLInputElement;
    this.tempZoomValue = input.value;
  }

  // Function to handle the keydown event
  onZoomInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const value = parseFloat(this.tempZoomValue);
      if (!isNaN(value)) {
        this.zoom = value / 100;
        setTimeout(() => this.centerPdf(), 100);
      }
    }
  }
  // Function to handle page change
  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  // Function to obtain the total number of pages
  afterLoadComplete(pdfData: any) {
    this.totalPages = pdfData.numPages;
  }
}
