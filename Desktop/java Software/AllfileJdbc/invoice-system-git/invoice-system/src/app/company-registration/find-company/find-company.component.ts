import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyService } from '../../services/company-service';

@Component({
  selector: 'app-find-company',
  templateUrl: './find-company.component.html',
  styleUrls: ['./find-company.component.scss'],
  standalone: false,
})
export class FindCompanyComponent {
  companyForm: FormGroup;
  companyDetails: any = null;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private companyService: CompanyService) {
    this.companyForm = this.fb.group({
      companyId: ['', Validators.required]
    });
  }

  onSearch(): void {
    const companyId = this.companyForm.value.companyId;

    if (companyId) {
      this.companyService.getCompanyById(companyId).subscribe({
        next: (response: any) => {
          if (response && response.status === 'success') {
            this.companyDetails = response.data;
            this.errorMessage = '';
          } else {
            this.companyDetails = null;
            this.errorMessage = response.message || 'Company not found.';
          }
        },
        error: (error:any) => {
          this.companyDetails = null;
          this.errorMessage = 'Something went wrong. Please try again.';
          console.error('❌ Error:', error);
        }
      });
    }
  }
}
