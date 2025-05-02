import { Component } from '@angular/core';
import { ProformaInvoiceService } from '../../services/proforma-service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  proforma: any[] = [];
  product: any = {};

  constructor(
    private service: ProformaInvoiceService,
    private router: Router,
    private formbuilder: FormBuilder,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.findAllInvoices(); // ✅ Component load होते ही data लाना
  }

  findAllInvoices() {
    this.service.findAllInvoices(this.page, this.size).subscribe(
      (response) => {
        console.log('Invoices:', response);
        this.proforma = response.data || [];
        console.log(this.proforma);
        
        this.totalRecords = response.totalRecords || 0;
      },
      (error) => {
        console.error('Error:', error);
        this.proforma = [];
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
      this.service.deleteInvoice(id).subscribe({
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


