import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pdf-preview-modal',
  templateUrl: './pdf-preview-modal.component.html',
  styleUrls: ['./pdf-preview-modal.component.scss']
})
export class PdfPreviewModalComponent {
  @Input() pdfUrl: string = '';
  @Input() showModal: boolean = false;
  @Output() close = new EventEmitter<void>();
  
  closeModal() {
    this.close.emit();
  }

  downloadPDF() {
    const link = document.createElement('a');
    link.href = this.pdfUrl;
    link.download = 'invoice.pdf';
    link.click();
  }
}
