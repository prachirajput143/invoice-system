import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProformaUrlService {
    private baseUrl = 'http://localhost:2061/invoice-service-local/';  

  public readonly CREATE_INVOICE = `${this.baseUrl}proformainvoice/create`;
  public readonly UPDATE_INVOICE = `${this.baseUrl}proformainvoice/update`;
  public readonly GET_INVOICE_BY_ID = `${this.baseUrl}proformainvoice/findByInvoiceId`;
  public readonly GET_ALL_INVOICES = `${this.baseUrl}proformainvoice/findAll`;
  public readonly SOFT_DELETE_INVOICE = `${this.baseUrl}proformainvoice/softDelete`;
  public readonly RESTORE_INVOICE = `${this.baseUrl}proformainvoice/RestoreDeleteProformaInvoice`;
  
}
