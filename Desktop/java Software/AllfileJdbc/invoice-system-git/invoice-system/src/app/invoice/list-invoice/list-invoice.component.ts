import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss'],
  standalone:false
})
export class ListInvoiceComponent implements OnInit {

  clientInvoiceId: number | null = null;
  invoices: any[] = [];

  constructor(private service: InvoiceService) {}

  ngOnInit(): void {}

  fetchInvoicesByClient(): void {
    if (!this.clientInvoiceId) {
      alert('Please enter a valid Client Invoice ID.');
      return;
    }

    this.service.getInvoicesByClientId(this.clientInvoiceId).subscribe({
      next: (data) => {
        console.log('Fetched invoices:', data);
        this.invoices = data;
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
        this.invoices = [];
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'status-paid';
      case 'pending':
        return 'status-pending';
      case 'overdue':
        return 'status-overdue';
      default:
        return 'status-default';
    }
  }
}
