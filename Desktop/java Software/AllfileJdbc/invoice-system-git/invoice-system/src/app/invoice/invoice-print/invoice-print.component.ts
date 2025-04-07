import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss'],
  standalone: false
})
export class InvoicePrintComponent {
  constructor(
    public dialogRef: MatDialogRef<InvoicePrintComponent>,
    @Inject(MAT_DIALOG_DATA) public invoiceData: any
  ) {}

  // Print function
  printInvoice() {
    window.print();
  }
}
