import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company-service';

@Component({
  selector: 'app-update-company',
  templateUrl: './update-company.component.html',
  styleUrls: ['./update-company.component.scss'],
  standalone: false
})
export class UpdateCompanyComponent implements OnInit {
  updateForm: FormGroup;
  companyFound = false;
  successMessage = '';
  errorMessage = '';
  allCompanies: any[] = [];
  page: number = 0;
  size: number = 100;
  totalCompanies: number = 0;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService
  ) {
    this.updateForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      address: ['', Validators.required],
      companyPhone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      taxPayer: [''],
      website: [''],
      adminUserName: ['']
    });
  }

  ngOnInit(): void {
    this.fetchCompanies();
  }

  fetchCompanies(): void {
    this.companyService.findAllCompanies(this.page, this.size).subscribe({
      next: (response: any) => {
        this.allCompanies = response.data || response;
        this.totalCompanies = response.totalRecords || this.allCompanies.length;
      },
      error: (err: any) => {
        console.error('Error fetching companies:', err);
      }
    });
  }

  onCompanySelect(event: Event): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.companyFound = false;

    const target = event.target as HTMLSelectElement;
    const companyId = target.value;

    if (companyId) {
      // Convert companyId to a number
      const numericCompanyId = +companyId;  // Convert string to number

      // Now pass numericCompanyId to getCompanyById
      this.companyService.getCompanyById(numericCompanyId).subscribe({
        next: (response) => {
          const data = response.data;  // ✅ Extract the actual company data
          console.log('Fetched company data:', data);

          this.companyFound = true;

          this.updateForm.patchValue({
            id: data.id || numericCompanyId,
            name: data.name || '',
            address: data.address || '',
            companyPhone: data.companyPhone || '',
            email: data.email || '',
            password: data.password || '',
            taxPayer: data.taxPayer || '',
            website: data.website || '',
            adminUserName: data.adminUserName || ''
          });
        },
        error: () => {
          this.errorMessage = 'Company not found.';
          this.companyFound = false;
          this.updateForm.reset();
        }
      });
    }
  }

  updateCompany(): void {
    this.successMessage = '';
    this.errorMessage = '';

    if (this.updateForm.valid) {
      console.log('Submitting update:', this.updateForm.value);

      this.companyService.updateCompany(this.updateForm.value).subscribe({
        next: () => {
          this.successMessage = 'Company updated successfully!';
        },
        error: (err) => {
          this.errorMessage = 'Update failed.';
          console.error('Update error:', err);
        }
      });
    } else {
      this.errorMessage = 'Please fill all required fields.';
    }
  }
}
