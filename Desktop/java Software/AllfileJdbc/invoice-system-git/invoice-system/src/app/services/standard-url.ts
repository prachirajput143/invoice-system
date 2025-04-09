import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandardUrlService {
    private baseUrl = 'http://localhost:2061/invoice-service-local/';  

  public readonly CREATE_INVOICE = `${this.baseUrl}standardinvoice/signup`;
  public readonly UPDATE_INVOICE = `${this.baseUrl}standardinvoice/update`;
  public readonly GET_INVOICE_BY_ID = `${this.baseUrl}standardinvoice/findById`;
  public readonly GET_ALL_INVOICES = `${this.baseUrl}standardinvoice/findAllInvoices`;
  public readonly SOFT_DELETE_INVOICE = `${this.baseUrl}standardinvoice/softDelete`;
  public readonly RESTORE_INVOICE = `${this.baseUrl}standardinvoice/RestoreDeleteProformaInvoice`;
  
}
