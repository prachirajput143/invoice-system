import { Component } from '@angular/core';
import { ProformaInvoiceService } from '../../services/proforma-service';
import { CompanyService } from '../../services/company-service';
import { ClientService } from '../../services/client-service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-proforma-signup',
standalone:false,
  templateUrl: './proforma-signup.component.html',
  styleUrl: './proforma-signup.component.css'
})
export class ProformaSignupComponent {
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
    private service: ProformaInvoiceService
  )
  
 
{
    this.invoiceForm = this.fb.group({
      invoiceNumber: [''],
      status: [''],
      totalAmount: [''], 
      validityPeriod: [''],// ✅ Correct spelling
      paymentInstructions: [''],
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
    this.companyService.getAllCompanies(0, 100).subscribe({
      next: (res: { data: any[] }) => {
        console.log("🚀 Company API Response:", res);  // 👈 log the full response
        this.companies = res.data;
        console.log("✅ Companies loaded:", this.companies);  // 👈 log after assignment
      },
      error: (err) => {
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


