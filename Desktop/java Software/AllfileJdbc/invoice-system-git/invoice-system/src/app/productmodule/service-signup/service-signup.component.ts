import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClientService } from '../../services/client-service';
import { ServiceInvoiceService } from '../../services/service';

@Component({
  selector: 'app-invoice',
  templateUrl: './service-signup.component.html',
  styleUrls: ['./service-signup.component.css'],
  standalone: false
})
export class ServiceSignupComponent implements OnInit {
  invoiceForm!: FormGroup;
  clients: any[] = [];
  selectedClientId: string = '';
  successMessage = '';
  errorMessage = '';
  isLoading = false;
  clientList: any[] = [];


  constructor(
    private fb: FormBuilder, 
    private http: HttpClient,
    private clientService: ClientService, // ✅ Correct Service
    private service: ServiceInvoiceService
  ) {
    this.invoiceForm = this.fb.group({
      dueDate: [''],
      grandTotal: [''],
      notes: [''],
      paymentTerm: [''],
      status: [''],
      subTotal: [''],
      tax: [''],
      clientId: [null]
    });
  }

  ngOnInit() {
    this.loadClients(); 
  }

  loadClients() {
    this.clientService.getAllClients(0, 10).subscribe({
      next: (response: any) => {
        console.log("✅ Fetched Clients Data:", response);
        this.clients = response.data;  // ✅ Corrected
      },
      error: (error: any) => {
        console.error("❌ Error fetching clients:", error);
      }
    });
  }

  saveInvoice(): void {
    if (!this.invoiceForm.value.clientId) {
      alert("Please select a client before creating the invoice.");
      return;
    }
  
    const invoiceData = this.invoiceForm.value; // ✅ Yeh line yaha likhni hai
    console.log('Invoice to save:', invoiceData); // Optional: check data in console
  
    this.isLoading = true;
  
    this.service.signupInvoice(invoiceData).subscribe({
      next: (response) => {
        this.successMessage = "Invoice saved successfully!";
        this.isLoading = false;
        this.invoiceForm.reset();
      },
      error: (error) => {
        console.error("Error saving invoice:", error);
        this.errorMessage = "Something went wrong while saving the invoice.";
        this.isLoading = false;
      }
    });
  }
}
