import { Component, OnInit } from '@angular/core';
import { ClientRegistrationService } from '../../services/client-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-findall-client',
  templateUrl: './findall-client.component.html',
  styleUrls: ['./findall-client.component.scss'],
  standalone: false
})
export class FindAllClientComponent implements OnInit {
  clients: any[] = [];
  page: number = 0;
  size: number = 0;
  totalClients: number = 0;

  constructor(private clientService: ClientRegistrationService) {}

  ngOnInit(): void {
    this.fetchClients();
  }

  fetchClients(): void {
    this.clientService.findAllClients(this.page, this.size).subscribe({
      next: (response: any) => {
        console.log('Client Data:', response);
        this.clients = response.data || response;
        this.totalClients = response.totalRecords || this.clients.length; // fallback
      },
      error: (err: any) => {
        console.error('Error fetching clients:', err);
      }
    });
  }

  deleteClient(id: number): void {
    if (confirm('Are you sure you want to delete this client?')) {
      this.clientService.deleteClient(id).subscribe({
        next: () => {
          alert('Client deleted successfully');
          this.fetchClients(); // Refresh after delete
        },
        error: (err: any) => {
          console.error(err);
          alert('Failed to delete client');
        }
      });
    }
  }
}
