import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/internal/Observable";
import { ApiUrlService } from './product-url-service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductInvoiceService {
  constructor(private http: HttpClient, private apiUrl: ApiUrlService) {}
 
  // ✅ Invoice Save API
  signupInvoice(invoiceData: any): Observable<any> {
    console.log("API Call Data:", invoiceData); // Debugging ke liye
    return this.http.post(this.apiUrl.signup, invoiceData);
  }
  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }
  
  // ✅ Find Invoice By ID
  findInvoiceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl.findByInvoiceId}?id=${id}`);
  }

  // ✅ Find All Invoices
  findAllInvoices(page: number, size: number): Observable<any> {
    const url = `${this.apiUrl.findAllInvoices}?page=${page}&size=${size}`;
    console.log('API URL:', url); // ✅ Console me print hoga
    return this.http.get<any>(url);
  }
  
  deleteInvoice(id: number): Observable<any> {
    const url = `${this.apiUrl.softDeleteByInvoiceId}?id=${id}`;  // ✅ Use query param
    console.log('Deleting Invoice:', url);  // Debugging
  
    return this.http.delete(url, { responseType: 'json' });
  }
  
  
  

  restoreDeleteInvoice(id: number, status: number): Observable<any> {
    return this.http.delete(`${this.apiUrl.restoreDeleteProductInvoice}?id=${id}&status=${status}`);
  }
  downloadInvoice(invoiceId: number) {
    const url = `http://localhost:2061/productinvoice/download/${invoiceId}`;
    return this.http.get(url, { responseType: 'blob' }); // 👈 PDF ko binary format me fetch karega
  }
}
