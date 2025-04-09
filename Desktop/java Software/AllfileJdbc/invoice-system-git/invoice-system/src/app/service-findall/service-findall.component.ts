import { Component } from '@angular/core';
import { ServiceInvoiceService } from '../services/service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-service-findall',
standalone:false,
  templateUrl: './service-findall.component.html',
  styleUrl: './service-findall.component.css'
})
export class ServiceFindallComponent {
  constructor(private invoiceService: ServiceInvoiceService, private router: Router,
    private formbuilder: FormBuilder,  private route: ActivatedRoute, // ✅ ActivatedRoute inject kiya
  ) { }
  totalRecords: number = 0; // Total invoices count
  page: number = 1;
  size: number = 5;
  invoices: any[] = []; // ✅ Co

  findAllInvoices() {
    this.invoiceService.findAllInvoices(this.page, this.size).subscribe(
      (response) => {
        console.log('Invoices:', response);
        this.invoices = response.data || [];
        this.totalRecords = response.totalRecords || 0; // ✅ Total invoices set karein
      },
      (error) => {
        console.error('Error:', error);
        this.invoices = [];
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
          this.findAllInvoices(); // List को Refresh करो
        },
        error: (error) => {
          console.error('Error Deleting Invoice:', error);
          alert('Error deleting invoice! Check Console.');
        }
      });

}
  }
  updateInvoice(invoiceId: number) {
    console.log('Navigating to update form with ID:', invoiceId);
    this.router.navigate(['/update', invoiceId]);
  }
  
  testUpdate(id: number) {
    console.log('Navigating to update form with ID:', id);
    this.router.navigate(['/update', id]); // ✅ Navigate to Update Page
  }
  
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // ✅ Get ID from URL
    console.log('Update Form Opened for ID:', id);
  }
  logId(id: any) {
    console.log('Navigating to update form with ID:', id);
  }
  
}
