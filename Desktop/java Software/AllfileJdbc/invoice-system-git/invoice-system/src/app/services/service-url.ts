import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
    private baseUrl = 'http://localhost:2061/invoice-service-local/';  

  public readonly CREATE_INVOICE = `${this.baseUrl}serviceinvoice/signup`;
  public readonly UPDATE_INVOICE = `${this.baseUrl}serviceinvoice/update`;
  public readonly GET_INVOICE_BY_ID = `${this.baseUrl}serviceinvoice/findByInvoiceId`;
  public readonly GET_ALL_INVOICES = `${this.baseUrl}serviceinvoice/findAllInvoices`;
  public readonly SOFT_DELETE_INVOICE = `${this.baseUrl}serviceinvoice/softDelete`;
  public readonly RESTORE_INVOICE = `${this.baseUrl}serviceinvoice/RestoreDeleteProformaInvoice`;
  
}
