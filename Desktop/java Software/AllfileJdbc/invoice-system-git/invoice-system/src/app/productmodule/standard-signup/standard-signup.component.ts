import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { StandardInvoiceService } from '../../services/standard-service';
import { ClientService } from '../../invoice/service/client.service'; 
import { CompanyService } from '../../services/company-service';

@Component({
  selector: 'app-standard-invoice',
  templateUrl: './standard-signup.component.html',
  styleUrls: ['./standard-signup.component.css'],
  standalone: false
})
export class StandardSignupComponent implements OnInit {
  invoiceForm!: FormGroup;
  clients: any[] = [];
  companies: any[] = [];
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private clientService: ClientService,
    private companyService: CompanyService,
    private service: StandardInvoiceService
  ) {
    this.invoiceForm = this.fb.group({
      discount: [''],
      dueDate: [''],
      grandTotal: [''],
      invoiceNumber: [''],
      isRecurring: [false],
      notes: [''],
      paymentTerm: [''],
      recurringFrequency: [''],
      sendEmail: [0],
      status: [''],
      subtotal: [''], // ✅ Correct spelling
      tax: [''],
      companyId: [null],
      clientId: [null]
    });
  }

  ngOnInit() {
    this.loadClients();
    this.loadCompanies();
  }

  loadClients() {
    this.clientService.getAllClients(0, 100).subscribe({
      next: (res: { data: any[] }) => {
        this.clients = res.data;
      },
      error: (err) => {
        console.error("Error loading clients:", err);
      }
    });
  }

  loadCompanies() {
    this.companyService.findAllCompanies(0, 100).subscribe({
      next: (res: { data: any[] }) => {
        console.log("🚀 Company API Response:", res);  // 👈 log the full response
        this.companies = res.data;
        console.log("✅ Companies loaded:", this.companies);  // 👈 log after assignment
      },
      error: (err:any) => {
        console.error("❌ Error loading companies:", err);
      }
    });
  }
  
  saveInvoice(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.invoiceForm.value.clientId || !this.invoiceForm.value.companyId) {
      alert("Please select both Client and Company before saving.");
      return;
    }

    const invoiceData = this.invoiceForm.value;
    console.log('Invoice to save:', invoiceData);

    this.isLoading = true;

    this.service.signupInvoice(invoiceData).subscribe({
      next: () => {
        this.successMessage = "✅ Invoice saved successfully!";
        this.isLoading = false;
        this.invoiceForm.reset();
      },
      error: (err) => {
        console.error("❌ Error saving invoice:", err);
        this.errorMessage = "Something went wrong while saving the invoice.";
        this.isLoading = false;
      }
    });
  }
}
