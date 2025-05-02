import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-list-invoice',
  templateUrl: './list-invoice.component.html',
  styleUrls: ['./list-invoice.component.scss'],
  standalone:false
})
export class InvoiceListComponent implements OnInit {
  invoices: any[] = [];
  loading = false;
  page = 10;
  size = 19;
  totalRecords = 0;
  totalPages = 0;
  paymentStatusFilter = '';
  searchCustomerName='';

  paymentStatusOptions = ['PAID', 'OVERDUE', 'PENDING'];

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit() {
    this.fetchInvoices();
  }

  fetchInvoices() {
    this.loading = true;
    this.invoiceService.getInvoices(this.page, this.size, this.paymentStatusFilter, this.searchCustomerName).subscribe({
      next: (res) => {
        this.invoices = res.data || [];
        this.totalRecords = res.totalRecords;
        this.totalPages = Math.ceil(this.totalRecords / this.size);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
        this.loading = false;
      }
    });
  }
  
  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.fetchInvoices();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.fetchInvoices();
    }
  }
  search() {
    this.page = 0; // jab search ho to first page se start karo
    this.fetchInvoices();
  }  

  getPaymentStatusClass(status: string) {
    switch (status) {
      case 'PAID':
        return 'status-paid';
      case 'OVERDUE':
        return 'status-overdue';
      case 'PENDING':
        return 'status-pending';
      default:
        return '';
    }
  }
}
