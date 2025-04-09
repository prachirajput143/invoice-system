package com.amstech.invoice.managment.converter.entity;

import java.util.UUID;
import org.springframework.stereotype.Component;
import com.amstech.invoice.managment.entity.Invoice;
import com.amstech.invoice.managment.request.view.InvoiceRequest;

@Component
public class InvoiceModelToEntityConverter {
	
	public static Invoice convertToInvoiceEntity(InvoiceRequest invoiceRequest) {
		
        Invoice invoice = new Invoice();
        invoice.setClient(invoiceRequest.getClient());
        invoice.setInvoiceNumber(UUID.randomUUID().toString().substring(0, 8).toUpperCase()); // Auto-generate invoice number
        invoice.setIssueDate(invoiceRequest.getIssueDate());
        invoice.setDueDate(invoiceRequest.getDueDate());
        invoice.setStatus(invoiceRequest.getStatus());
        invoice.setCustomerName(invoiceRequest.getCustomerName());
        invoice.setCustomerEmail(invoiceRequest.getCustomerEmail());
        invoice.setCustomerPhone(invoiceRequest.getCustomerPhone());
        invoice.setInvoiceType(invoiceRequest.getInvoiceType());
        invoice.setSubTotal(invoiceRequest.getSubTotal());
        invoice.setDiscount(invoiceRequest.getDiscount());
        invoice.setTax(invoiceRequest.getTax());
        invoice.setShipping(invoiceRequest.getShipping());
        invoice.setGrandTotal(invoiceRequest.getGrandTotal());
        invoice.setPaid(invoiceRequest.getPaid());
        invoice.setBalance(invoiceRequest.getBalance());
        
        return invoice;
    }
	public static Invoice updateInvoiceModel(Invoice invoice, InvoiceRequest invoiceRequest) {
	    if (invoiceRequest.getStatus() != null) invoice.setStatus(invoiceRequest.getStatus());
	    if (invoiceRequest.getCustomerName() != null) invoice.setCustomerName(invoiceRequest.getCustomerName());
	    if (invoiceRequest.getCustomerEmail() != null) invoice.setCustomerEmail(invoiceRequest.getCustomerEmail());
	    if (invoiceRequest.getCustomerPhone() != null) invoice.setCustomerPhone(invoiceRequest.getCustomerPhone());
	    if (invoiceRequest.getGrandTotal() != null) invoice.setGrandTotal(invoiceRequest.getGrandTotal());
	    if (invoiceRequest.getSubTotal() != null) invoice.setSubTotal(invoiceRequest.getSubTotal());
	    if (invoiceRequest.getDiscount() != null) invoice.setDiscount(invoiceRequest.getDiscount());
	    if (invoiceRequest.getTax() != null) invoice.setTax(invoiceRequest.getTax());
	    if (invoiceRequest.getShipping() != null) invoice.setShipping(invoiceRequest.getShipping());
	    if (invoiceRequest.getPaid() != null) invoice.setPaid(invoiceRequest.getPaid());
	    if (invoiceRequest.getBalance() != null) invoice.setBalance(invoiceRequest.getBalance());

	    return invoice;
	}
	

}