import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company-service';  // ✅ already imported
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-company-registration',
  standalone: false,
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {

  companyForm!: FormGroup;
  isSubmitting: boolean = false; 

  
  businessTypes: any[] = [];
  clients: any[] = [];

  // ✅ Success message flag
  showSuccessMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {
    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      companyPhone: [''],
      address: [''],
      clientId: [null, Validators.required],
      businessTypeId: [null, Validators.required],
      taxIdentificationNumber: [''],
      taxPayer: [''],
      cinNo: [''],
      registrationNo: [''],
      website: [''],
      adminUserName: [''],
      password: ['']
    });

    console.log("Form Data Before Submit:", this.companyForm.value);
    console.log("Selected Business Type ID:", this.companyForm.get('businessTypeId')?.value);
  }

  ngOnInit() {
    this.loadBusinessTypes();
    this.loadClients();
  }

  loadClients() {
    this.companyService.getAllClients().subscribe({
      next: (response: any) => {
        console.log("✅ Fetched Clients Data:", response);
        this.clients = response.data;
      },
      error: (error: any) => {
        console.error("❌ Error fetching clients:", error);
      }
    });
  }

  loadBusinessTypes() {
    this.companyService.getAllBusinessTypes().subscribe({
      next: (data: any) => {
        console.log("Fetched Business Types:", data);
        this.businessTypes = Array.isArray(data) ? data : Object.values(data);
      },
      error: (error) => {
        console.error("❌ Error fetching business types:", error);
      }
    });
  }
  onSubmit() {
    if (this.companyForm.valid) {
      const companyData = {
        ...this.companyForm.value,
        businessTypesId: this.companyForm.value.businessTypeId
      };
  
      this.companyService.registerCompany(companyData).subscribe({
        next: (response) => {
          console.log("📦 Response from API:", response);
  
          if (response.status === 'success') {
            this.showSuccessMessage = true;
            this.cdr.detectChanges(); // ✅ Manually detect change
          
            // Auto-hide after 3 seconds
            setTimeout(() => {
              this.showSuccessMessage = false;
              this.cdr.detectChanges(); // ✅ Hide properly
            }, 3000);
          
            this.companyForm.reset();
          }
           else {
            alert("❌ " + (response.message || "Company registration failed."));
          }
        },
        error: (error) => {
          console.error("❌ API Error:", error);
          alert("❌ " + (error.error?.message || "Something went wrong!"));
        }
      });
    } else {
      console.log("❌ Form is invalid");
    }
  }
  
}