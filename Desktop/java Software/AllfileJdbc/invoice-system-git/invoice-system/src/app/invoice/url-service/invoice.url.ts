import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class InvoiceUrlService {
  baseUrl = 'http://localhost:2061/invoice-service-local';

  get create(): string {
    return `${this.baseUrl}/invoices/create`;
  }

  // Add PDF URL if needed separately
  get generatePdf(): string {
    return `${this.baseUrl}/invoices/generate-pdf`;
  }
}
