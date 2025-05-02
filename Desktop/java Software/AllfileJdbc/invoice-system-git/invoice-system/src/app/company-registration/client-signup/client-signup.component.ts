import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientRegistrationService } from '../../services/client-service';

@Component({
  selector: 'app-client-signup',
  templateUrl: './client-signup.component.html',
  styleUrls: ['./client-signup.component.scss'],
  standalone:false
})
export class ClientSignupComponent implements OnInit {
  
  clientForm!: FormGroup;
  isSubmitting: boolean = false; 
  showSuccessMessage = false; // Add this line // ✅ Form submission ke time button disable hoga

  constructor(
    private fb: FormBuilder, 
    private clientRegistrationService: ClientRegistrationService
  ) {}

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // ✅ 10-digit phone number validation
      companyName: ['', Validators.required],
      businessName: ['', Validators.required],
      address: ['', Validators.required],
      billingAddress: ['', Validators.required],
      postalZipCode: ['', Validators.required],
      linkedinProfileUrl: [''],
      panNumber: ['', [Validators.required, Validators.pattern('^[A-Z]{5}[0-9]{4}[A-Z]{1}$')]],  // ✅ PAN number validation
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      specificRegistrationDetails: ['']
    });
  }

  onSubmit(): void {
    if (this.clientForm.valid) {
      this.isSubmitting = true;
      const clientData = this.clientForm.value;
  
      console.log('Submitting Client Data:', clientData);
  
      this.clientRegistrationService.registerClient(clientData).subscribe({
        next: (response: any) => {
          console.log('📥 Signup Response:', response);
  
          if (response.status === 'success') {
            alert('🎉 Client Registered Successfully!');
            this.clientForm.reset();
          } else {
            alert(`❌ Signup Failed: ${response.message}`);
          }
  
          this.isSubmitting = false;
        },
        error: (error: any) => {
          console.error('❌ HTTP Error:', error);
          alert('⚠️ Something went wrong. Please try again later.');
          this.isSubmitting = false;
        }
      });
  
    } else {
      console.log('❌ Form is invalid');
      alert('⚠️ Please fill all required fields correctly.');
    }
  }
}  