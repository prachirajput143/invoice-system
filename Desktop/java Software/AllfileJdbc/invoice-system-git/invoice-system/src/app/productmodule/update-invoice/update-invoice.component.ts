import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductInvoiceService } from '../../services/product-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css'],
  standalone: false
})
export class ProductInvoiceUpdateComponent implements OnInit {
  invoiceForm: FormGroup;
  invoiceFound = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  allInvoices: any[] = [];
  page: number = 0;
  size: number = 100;
  totalInvoices: number = 0;

  constructor(
    private fb: FormBuilder,
    private invoiceService: ProductInvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      id: [''],
      totalAmount: [0],
      invoiceNumber: [''],
      subTotal: [0],
      discount: [0],
      tax: [0],
      dueDate: [''],
      grandTotal: [0],
      quantity: [0],
      customerEmail: [''],
      customerPhone: [''],
      customerName: [''],
      paid: [0],
      balance: [0],
      category: [''],
      note: [''],
      paymentStatus: [''],
      paymentMethod: ['']
    });
  }

  ngOnInit(): void {
    this.fetchInvoicesAndLoadFirst();
  }

  fetchInvoicesAndLoadFirst(): void {
    this.invoiceService.findAllInvoices(this.page, this.size).subscribe({
      next: (response: any) => {
        console.log('Invoice response:', response);

        if (response.status === 'success') {
          this.allInvoices = response.data;
          this.totalInvoices = this.allInvoices.length;

          if (this.allInvoices.length > 0) {
            const firstInvoiceId = this.allInvoices[0].id;
            this.loadInvoiceById(firstInvoiceId);
          }
        } else {
          console.error('Invoice fetch failed:', response.message);
          this.allInvoices = [];
        }
      },
      error: (err: any) => {
        console.error('HTTP Error fetching invoices:', err);
        this.allInvoices = [];
      }
    });
  }

  loadInvoiceById(invoiceId: number): void {
    this.invoiceService.findAllInvoices(this.page, this.size).subscribe({
      next: (response: any) => {
        // Ensure it's an array
        if (Array.isArray(response)) {
          this.allInvoices = response;
        } else if (Array.isArray(response.data)) {
          this.allInvoices = response.data;
        } else {
          this.allInvoices = []; // Fallback to empty array
          console.error("Invalid invoice data format", response);
        }
  
        this.totalInvoices = this.allInvoices.length;
  
        if (this.allInvoices.length > 0) {
          // Ensure that quantity is never null
          const invoice = this.allInvoices.find(invoice => invoice.id === invoiceId);
          if (invoice) {
            invoice.quantity = invoice.quantity ?? 0;  // Set default value if null
            this.invoiceForm.patchValue(invoice);  // Populate form
          }
        }
      },
      error: (err) => {
        console.error('Error fetching invoices:', err);
      }
    });
  }
  
  onInvoiceSelect(event: Event): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    const target = event.target as HTMLSelectElement;
    const invoiceId = Number(target.value);
    if (invoiceId) {
      this.loadInvoiceById(invoiceId);
    }
  }

  onSubmit(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    if (this.invoiceForm.valid) {
      const id = this.invoiceForm.value.id;
      this.invoiceService.updateProduct(id, this.invoiceForm.value).subscribe({
        next: () => {
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.reloadPage();
          }, 3000);
        },
        error: (err) => {
          console.error('Update error:', err);
          this.showErrorMessage = true;
          setTimeout(() => (this.showErrorMessage = false), 3000);
        }
      });
    } else {
      this.showErrorMessage = true;
      setTimeout(() => (this.showErrorMessage = false), 3000);
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}
