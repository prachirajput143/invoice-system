import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { UrlService } from "./service-url";
import { Observable } from "rxjs";
import { ClientUrlService } from "./client-url-service";

@Injectable({
  providedIn: 'root'
})
export class ServiceInvoiceService {
  constructor(
    private http: HttpClient,
    private apiUrl: UrlService,
    private url: ClientUrlService
  ) {}

  signupInvoice(invoiceData: any): Observable<any> {
    console.log("API Call Data:", invoiceData); // Debugging ke liye
    return this.http.post(this.apiUrl.CREATE_INVOICE, invoiceData);
  }

  getAllClients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url.GET_ALL_CLIENTS}?page=0&size=100`);
  }
  findInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl.GET_INVOICE_BY_ID}/${id}`);
  }
  findAllInvoices(page: number = 0, size: number = 10): Observable<any> {
    const fullUrl = `${this.apiUrl.GET_ALL_INVOICES}?page=${page}&size=${size}`;
    console.log('✅ Calling API:', fullUrl);
    return this.http.get<any>(fullUrl);
  }
  deleteInvoice(id: number): Observable<any> {
    const url = `${this.apiUrl.SOFT_DELETE_INVOICE}?id=${id}`;  // ✅ Use query param
    console.log('Deleting Invoice:', url);  // Debugging
  
    return this.http.delete(url, { responseType: 'json' });
  }
  updateInoice(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl.UPDATE_INVOICE}/${id}`, product);
  }
  
  
}
