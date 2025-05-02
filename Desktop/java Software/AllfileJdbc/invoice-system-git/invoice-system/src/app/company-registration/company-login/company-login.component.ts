import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company-service'; // ✅ Import service

@Component({
  selector: 'app-company-login',
  standalone: false,
  templateUrl: './company-login.component.html',
  styleUrls: ['./company-login.component.scss']
})
export class CompanyLoginComponent {
  loginSuccessMessage: boolean = false;
  constructor(
    private companyService: CompanyService,
    private router: Router
  ) {}

  loginForm = new FormGroup({
    adminUserName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  onLogin() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
  
      this.companyService.loginCompany(loginData).subscribe({
        next: (response: any) => {
          console.log('📥 Login Response:', response);
  
          if (response.status === 'success') {
            this.loginSuccessMessage = true;
  
            // Auto hide after 3 seconds
            setTimeout(() => {
              this.loginSuccessMessage = false;
              // Optionally navigate
              // this.router.navigate(['/dashboard']);
            }, 9000);
          } else {
            alert(response.message || 'Login failed. Please try again.');
          }
        },
        error: (error) => {
          console.error('❌ HTTP Error:', error);
          alert('Something went wrong. Please try again later.');
        }
      });
    } else {
      alert('Please enter valid username and password.');
    }
  }
  
}  
