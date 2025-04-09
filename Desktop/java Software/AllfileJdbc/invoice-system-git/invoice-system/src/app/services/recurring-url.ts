import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecurringUrlService {
    private baseUrl = 'http://localhost:2061/invoice-service-local/';  

  public readonly CREATE_INVOICE = `${this.baseUrl}recurringinvoice/signup`;
  public readonly UPDATE_INVOICE = `${this.baseUrl}recurringinvoice/update`;
  public readonly GET_INVOICE_BY_ID = `${this.baseUrl}recurringinvoice/findByInvoiceId`;
  public readonly GET_ALL_INVOICES = `${this.baseUrl}recurringinvoice/findAllInvoices`;
  public readonly SOFT_DELETE_INVOICE = `${this.baseUrl}recurringinvoice/softDeleteRecurringInvoice`;
  public readonly RESTORE_INVOICE = `${this.baseUrl}recurringinvoice/RestoreDeleteProformaInvoice`;
  
}
