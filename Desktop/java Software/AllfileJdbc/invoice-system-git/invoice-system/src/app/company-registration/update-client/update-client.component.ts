import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientRegistrationService } from '../../services/client-service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.scss'],
  standalone: false
})
export class UpdateClientComponent implements OnInit {
  updateForm: FormGroup;
  clientFound = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  allClients: any[] = [];
  page: number = 0;
  size: number = 100;
  totalClients: number = 0;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientRegistrationService,
    private cdRef: ChangeDetectorRef
  ) {
    this.updateForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      mobileNumber: [''],
      companyName: [''],
      panNumber: ['']
    });
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.findAllClients(this.page, this.size).subscribe({
      next: (response: any) => {
        this.allClients = response.data || response;
        this.totalClients = response.totalRecords || this.allClients.length;
      },
      error: (err: any) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  onClientSelect(event: Event): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
    this.clientFound = false;

    const target = event.target as HTMLSelectElement;
    const clientId = target.value;

    if (clientId) {
      this.clientService.getClientById(clientId).subscribe({
        next: (response) => {
          const data = response.data; 
          console.log('Fetched client data:', data);

          this.clientFound = true;

          this.updateForm.patchValue({
            id: data.id || clientId,
            firstName: data.firstName || '',
            lastName: data.lastName || '',
            email: data.email || '',
            address: data.address || '',
            mobileNumber: data.mobileNumber || '',
            companyName: data.companyName || '',
            panNumber: data.panNumber || ''
          });
        },
        error: () => {
          this.showErrorMessage = true;
          this.clientFound = false;
          this.updateForm.reset();
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      });
    }
  }
  updateClient(): void {
    this.showSuccessMessage = false;
    this.showErrorMessage = false;
  
    if (this.updateForm.valid) {
      this.clientService.updateClient(this.updateForm.value).subscribe({
        next: () => {
          this.showSuccessMessage = true;
  
         
          setTimeout(() => {
            this.showSuccessMessage = false;
            this.reloadPage(); 
          }, 3000); 
        },
        error: (err) => {
          console.error('Update error:', err);
          this.showErrorMessage = true;
  
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000); 
        }
      });
    } else {
      this.showErrorMessage = true;
  
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 3000); 
    }
  }
    reloadPage(): void {
    window.location.reload();   
  }
}  