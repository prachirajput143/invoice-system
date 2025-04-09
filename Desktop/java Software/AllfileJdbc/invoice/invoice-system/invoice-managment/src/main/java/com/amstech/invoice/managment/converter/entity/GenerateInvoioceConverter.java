package com.amstech.invoice.managment.converter.entity;

import java.util.Optional;

import org.springframework.stereotype.Component;

import com.amstech.invoice.managment.entity.Invoice;
import com.amstech.invoice.managment.request.view.generateInvoiceRequest;

@Component
public class GenerateInvoioceConverter {
	
	public static Invoice GenerateConverter(generateInvoiceRequest generateInvoiceRequest,Optional<Invoice> existingInvoice) {
		
		Invoice invoice=new Invoice();
		
        existingInvoice.ifPresent(existing -> invoice.setClient(existing.getClient()));
		invoice.setCustomerName(generateInvoiceRequest.getCustomerName());
		invoice.setInvoiceNumber(generateInvoiceRequest.getInvoiceNumber());
		invoice.setIssueDate(generateInvoiceRequest.getIssueDate());
		invoice.setDueDate(generateInvoiceRequest.getDueDate());
		invoice.setTotalAmount(generateInvoiceRequest.getTotalAmount());
		
		return invoice;
	}
	public static Invoice UpdateConerter(generateInvoiceRequest generateInvoiceRequest,Optional<Invoice> existingInvoice) {
		  Invoice invoice= existingInvoice.get();
			// Update only if new values are provided
			  
		        if (generateInvoiceRequest.getCustomerName() != null) {
		        	invoice.setCustomerName(generateInvoiceRequest.getCustomerName());
		        }
		        if (generateInvoiceRequest.getInvoiceNumber() != null) {
		        	invoice.setInvoiceNumber(generateInvoiceRequest.getInvoiceNumber());
		        }
		        if (generateInvoiceRequest.getEmail() != null) {
		        	invoice.setCustomerEmail(generateInvoiceRequest.getEmail());
		        }
		        if (generateInvoiceRequest.getItems() != null) {
		        	invoice.setCustomerPhone(generateInvoiceRequest.getPhoneNumber());
		        }
		        if (generateInvoiceRequest.getIssueDate() != null) {
		        	invoice.setIssueDate(generateInvoiceRequest.getIssueDate());
		        }
		        if (generateInvoiceRequest.getDueDate() != null) {
		        	invoice.setDueDate(generateInvoiceRequest.getDueDate());
		        }
		        if (generateInvoiceRequest.getTotalAmount() != null) {
		        	invoice.setTotalAmount(generateInvoiceRequest.getTotalAmount());
		        }
		        return invoice;


	}
}