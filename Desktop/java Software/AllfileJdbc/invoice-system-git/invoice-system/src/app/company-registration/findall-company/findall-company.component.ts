import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../services/company-service';

@Component({
  selector: 'app-findall-company',
  templateUrl: './findall-company.component.html',
  styleUrls: ['./findall-company.component.scss'],
  standalone: false
})
export class FindAllCompanyComponent implements OnInit {
  companies: any[] = [];
  page = 0;
  size = 0;
  totalCompanies = 0;

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    // Optional auto-load
    // this.loadCompanies();
  }

  loadCompanies(): void {
    this.companyService.findAllCompanies(this.page, this.size).subscribe({
      next: (response) => {
        this.companies = response.data;
        this.totalCompanies = response.totalRecords; // 👈 This sets the count
      },
      error: (err) => console.error('Error loading companies:', err)
    });
  }
  
  

  // Alias method for HTML compatibility
  loadAllCompanies(): void {
    this.loadCompanies();
  }
  deleteCompany(id: number): void {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompany(id).subscribe({
        next: () => {
          alert('Company deleted successfully!');
          this.loadCompanies(); // 🔁 Sirf data reload karo
        },
        error: (err) => {
          console.error('Error deleting company:', err);
          alert('Failed to delete company.');
        }
      });
    }
  }
  restoreCompany(id: number): void {
    if (confirm('Do you want to restore this company?')) {
      this.companyService.restoreCompany(id).subscribe({
        next: () => {
          alert('✅ Company restored successfully');
          this.loadCompanies(); // 🔁 Corrected line
        },
        error: (err) => {
          console.error('Restore failed:', err);
          alert('❌ Restore failed: ' + err.message);
        }
      });
    }
  }
  
  
}  