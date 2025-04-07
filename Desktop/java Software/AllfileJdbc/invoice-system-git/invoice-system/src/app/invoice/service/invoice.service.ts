import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../invoice.model';
import { InvoiceUrlService } from '../url-service/invoice.url';
import { ClientUrlService } from '../url-service/client-url.service';
import { CompanyUrlService } from '../url-service/company-url.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient, private urlService: InvoiceUrlService,private clientUrl:ClientUrlService,private companyUrl:CompanyUrlService) {}

  createInvoice(invoice: any): Observable<any> {
    return this.http.post(this.urlService.create,invoice);
  }

  generatePDF(payload: any): Observable<any> {
    // Add correct endpoint here, example:
    return this.http.post(`${this.urlService.baseUrl}/invoices/generate-pdf`, payload);
  } 
  getAllClients(page: number = 0, size: number = 10): Observable<any> {
    const url = `${this.clientUrl.GET_ALL_CLIENTS}?page=${page}&size=${size}`;
    return this.http.get(url);
  }

  getAllCompanies(page: number = 0, size: number = 10): Observable<any> {
    const url = `${this.companyUrl.GET_ALL_COMPANIES}?page=${page}&size=${size}`;
    return this.http.get(url);
  }
}
