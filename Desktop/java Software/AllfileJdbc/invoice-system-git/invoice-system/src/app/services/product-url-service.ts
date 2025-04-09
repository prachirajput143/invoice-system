import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {
  private baseUrl = 'http://localhost:2061/invoice-service-local/';  

  get signup(): string { return `${this.baseUrl}productinvoice/signup`; }
  get updateInvoice(): string {  return `${this.baseUrl}productinvoice/update`; 
  }
    get findByInvoiceId(): string { return `${this.baseUrl}productinvoice/findByInvoiceId`; }
  get findAllInvoices(): string { return `${this.baseUrl}productinvoice/findAllInvoices`; }
  get softDeleteByInvoiceId(): string { 
    return `${this.baseUrl}productinvoice/softDeleteByInvoiceId`; 
  }
  
   get restoreDeleteProductInvoice(): string { return `${this.baseUrl}/RestoreDeleteProductInvoice`; }
}
  