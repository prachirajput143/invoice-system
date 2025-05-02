import { Component } from '@angular/core';
import { ClientRegistrationService } from '../../services/client-service';

@Component({
  selector: 'app-find-client',
  standalone: false,
  templateUrl: './find-client.component.html',
  styleUrls: ['./find-client.component.scss']
})
export class FindClientComponent {
  clientId: string = '';
  keyword: string = '';
  client: any = null;
  searchResults: any[] = [];

  constructor(private clientService: ClientRegistrationService) {}

  // 🔍 Find by ID
  findClient() {
    if (!this.clientId.trim()) {
      alert('Please enter a client ID.');
      return;
    }

    this.clientService.getClientById(this.clientId).subscribe({
      next: (data) => {
        this.client = data.data;
        this.searchResults = []; // ✅ ID se result mila, list clear karo
        console.log("Client found by ID:", this.client);
      },
      error: (err) => {
        console.error('Error fetching client by ID:', err);
        alert('Client not found.');
        this.client = null;
      }
    });
  }

  // 🔍 Search by keyword
  searchClient() {
    if (!this.keyword.trim()) {
      alert('Please enter a name, email, or mobile number to search.');
      return;
    }

    this.clientService.searchClientsByKeyword(this.keyword).subscribe({
      next: (data) => {
        this.searchResults = data.data;
        this.client = null; // ✅ List mil gaya, single client clear karo
        console.log("Search results:", this.searchResults);
      },
      error: (err) => {
        console.error('Error searching clients:', err);
        alert('No clients found.');
        this.searchResults = [];
      }
    });
  }
}
