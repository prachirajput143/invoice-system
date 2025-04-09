package com.amstech.invoice.managment.response.view;

import java.math.BigDecimal;
import java.util.List;
import com.amstech.invoice.managment.entity.Invoice;

public class InvoiceFindAllResponse {
	
	    private int id;
	    private String InvoiceNumber;
	    private String CustomerName;
	    private BigDecimal TotalAmount;
	    private String status;
	    private List<Invoice>invoices;

	    
	     public String getStatus() {
	        return status;
	    }
	    public void setStatus(String status) {
	        this.status = status;
	    }
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public String getInvoiceNumber() {
			return InvoiceNumber;
		}
		public void setInvoiceNumber(String invoiceNumber) {
			InvoiceNumber = invoiceNumber;
		}
		public String getCustomerName() {
			return CustomerName;
		}
		public void setCustomerName(String customerName) {
			CustomerName = customerName;
		}
		public BigDecimal getTotalAmount() {
			return TotalAmount;
		}
		public void setTotalAmount(BigDecimal totalAmount) {
			TotalAmount = totalAmount;
		}
		public List<Invoice> getInvoices() {
			return invoices;
		}
		public void setInvoices(List<Invoice> invoices) {
			this.invoices = invoices;
		}
		
	    
	}