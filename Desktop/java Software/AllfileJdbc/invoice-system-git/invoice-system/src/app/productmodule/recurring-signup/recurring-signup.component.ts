import { Component } from '@angular/core';
import { RecurringInvoiceService } from '../../services/recurring-service';
import { CompanyService } from '../../services/company-service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../invoice/service/client.service';

@Component({
  selector: 'app-recurring-signup',
  standalone: false,
  templateUrl: './recurring-signup.component.html',
  styleUrl: './recurring-signup.component.css'
})
export class RecurringSignupComponent {
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
    private service: RecurringInvoiceService
  ) {
    this.invoiceForm = this.fb.group({
      autoPaymentSetup: [false],  // 👈 default is unchecked (false)
      endDate: [''],
      paymentTerm: [''],
      totalPayable: [],
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
        console.error("❌ Error loading clients:", err);
      }
    });
  }

  loadCompanies() {
    this.companyService.findAllCompanies(0, 100).subscribe({
      next: (res: { data: any[] }) => {
        this.companies = res.data;
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
  
    // ✅ Type Conversion (IMPORTANT)
    const invoiceData = {
      ...this.invoiceForm.value,
      clientId: Number(this.invoiceForm.value.clientId),             // ✅ string → number
      companyId: Number(this.invoiceForm.value.companyId),           // ✅ string → number
      totalPayable: Number(this.invoiceForm.value.totalPayable),     // ✅ string → number
      autoPaymentSetup: this.invoiceForm.value.autoPaymentSetup ? 1 : 0,
      endDate: new Date(this.invoiceForm.value.endDate)
    };
  
    console.log("📤 Sending Invoice Data:", invoiceData);
  
    this.isLoading = true;
  
    this.service.signupInvoice(invoiceData).subscribe({
      next: (res) => {
        console.log("✅ Response from server:", res);
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