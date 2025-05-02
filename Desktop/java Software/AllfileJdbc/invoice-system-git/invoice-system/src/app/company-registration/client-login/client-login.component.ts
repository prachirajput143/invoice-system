import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientRegistrationService } from '../../services/client-service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.scss'],
  standalone: false
})
export class ClientLoginComponent {
  clientLoginForm: FormGroup;
  loginSuccessMessage: boolean = false;

  constructor(
    private fb: FormBuilder,
    private clientloginService: ClientRegistrationService,
    private router: Router // ✅ Added here
  ) {
    this.clientLoginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  navigateToRegister() {
    this.router.navigate(['/client-register']); // 🔁 Make sure this route exists
  }

  onLogin() {
    if (this.clientLoginForm.valid) {
      const { username, password } = this.clientLoginForm.value;
      console.log('🚀 Sending login request...');

      this.clientloginService.login(username, password).subscribe({
        next: (response: any) => {
          if (response.status === 'success') {
            console.log('✅ Login Successful:', response);
            this.loginSuccessMessage = true;
            setTimeout(() => {
              this.loginSuccessMessage = false;
            }, 3000);
          } else {
            console.log('❌ Login Failed:', response.message);
            this.loginSuccessMessage = false;
            alert('Wrong username or password!');
          }
        },
        error: (error: any) => {
          console.error('❌ Error:', error);
          this.loginSuccessMessage = false;
          alert('Login failed! Please try again.');
        }
      });
    }
  }
}
