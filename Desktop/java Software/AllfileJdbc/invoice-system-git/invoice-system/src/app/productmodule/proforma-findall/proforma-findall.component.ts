import { Component } from '@angular/core';
import { ProformaInvoiceService } from '../../services/proforma-service';
import { Router } from 'express';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-proforma-findall',
  standalone:false,
  templateUrl: './proforma-findall.component.html',
  styleUrl: './proforma-findall.component.css'
})
export class ProformaFindallComponent {
  totalRecords: number = 0;
  page: number = 1;
  size: number = 5;
  standard: any[] = [];
  product: any = {};

  constructor(
    private invoiceService: ProformaInvoiceService,
    private router: Router,
    private formbuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.findAllInvoices(); // ✅ Component load होते ही data लाना
  }

  findAllInvoices() {
    this.invoiceService.findAllInvoices(this.page, this.size).subscribe(
      (response) => {
        console.log('Invoices:', response);
        this.standard = response.data || [];
        this.totalRecords = response.totalRecords || 0;
      },
      (error) => {
        console.error('Error:', error);
        this.standard = [];
        this.totalRecords = 0;
      }
    );
  }

  nextPage() {
    if ((this.page * this.size) < this.totalRecords) {
      this.page++;
      this.findAllInvoices();
    }
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.findAllInvoices();
    }
  }

  deleteInvoice(id: number) {
    if (confirm('Are you sure you want to delete this invoice?')) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: (response) => {
          console.log('Invoice Deleted Successfully:', response);
          alert('Invoice Deleted Successfully!');
          this.findAllInvoices(); // ✅ Refresh list
        },
        error: (error) => {
          console.error('Error Deleting Invoice:', error);
          alert('Error deleting invoice! Check console.');
        }
      });
    }
  }
}



