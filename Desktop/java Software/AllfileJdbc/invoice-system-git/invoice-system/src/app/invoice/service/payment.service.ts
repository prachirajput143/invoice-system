import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080/api/payments'; //  Backend Payment API URL

  constructor(private http: HttpClient) { }

  addPayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add`, paymentData);
  }

  getPaymentsByInvoice(invoiceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/invoice/${invoiceId}`);
  }

  getInvoiceStatus(invoiceId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/status/${invoiceId}`);
  }

  updateInvoiceStatus(invoiceId: number, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/status/${invoiceId}`, { status });
  }
}
