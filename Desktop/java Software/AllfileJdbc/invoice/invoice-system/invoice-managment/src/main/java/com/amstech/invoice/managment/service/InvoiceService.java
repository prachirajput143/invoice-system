package com.amstech.invoice.managment.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.amstech.invoice.managment.converter.entity.InvoiceModelToEntityConverter;
import com.amstech.invoice.managment.entity.Invoice;
import com.amstech.invoice.managment.repo.ClientRepo;
import com.amstech.invoice.managment.repo.InvoiceRepository;
import com.amstech.invoice.managment.request.view.InvoiceRequest;
import com.amstech.invoice.managment.response.view.InvoiceFindAllResponse;

import jakarta.transaction.Transactional;

@Service
public class InvoiceService {
	private final Logger LOGGER=LoggerFactory.getLogger(InvoiceService.class);
	
	@Autowired
	private InvoiceRepository invoiceRepository;
	
	@Autowired
	private ClientRepo clientRepo;
	
	//create invoice
	public Invoice createInvoice(InvoiceRequest invoiceRequest) {
	    if (!clientRepo.existsById(invoiceRequest.getClient().getId())) {
	        throw new RuntimeException("User does not exist. Cannot create invoice.");
	    }
	    Invoice invoice = InvoiceModelToEntityConverter.convertToInvoiceEntity(invoiceRequest);
	    return invoiceRepository.save(invoice);
	}

	//total return invoice
	public Long getTotalInvoices() {
		return invoiceRepository.count(); 
	}
	//update invoice
	@Transactional
	public Invoice updateInvoice(Long invoiceId, InvoiceRequest invoiceRequest) { 
	    Optional<Invoice> existingInvoice = invoiceRepository.findById(invoiceId);
	    if (!clientRepo.existsById(invoiceRequest.getClient().getId())) {	    
	        throw new RuntimeException("Client does not exist. Cannot update invoice.");
	    } 	   
	    Invoice updateInvoiceModel = updateInvoice(invoiceId, invoiceRequest);
	    return invoiceRepository.save(updateInvoiceModel);
	}
	//find by Id
	public Invoice InvoiceById(Long id) {
        LOGGER.info("Fetching invoice with ID: {}", id);
	    return invoiceRepository.findById(id).orElse(null);
	}
	//All Invoice
	public List<Invoice> getAllInvoices() {
        LOGGER.info("Fetching all active invoices.");
        return invoiceRepository.findByDeletedFalse();
    }
	//Soft delete
	 public void softDeleteInvoice(Long id) {
	        Optional<Invoice> optionalInvoice = invoiceRepository.findById(id);
	        if (optionalInvoice.isPresent()) {
	            Invoice invoice = optionalInvoice.get();
	            invoice.setDeleted(true);
	            invoiceRepository.save(invoice);
	        } else {
	            throw new RuntimeException("Invoice not found");
	        }
	    }
	 //restore delete
	 public void restoreInvoice(Long id) {
		 Optional<Invoice> optionalInvoice = invoiceRepository.findById(id);
		 if (optionalInvoice.isPresent()) {
	            Invoice invoice = optionalInvoice.get();
	            invoice.setDeleted(false);
	            invoiceRepository.save(invoice);
	        } else {
	            throw new RuntimeException("Invoice not found");
	        }
	    }
	 //find all
	 public List<InvoiceFindAllResponse> findAll() {
		    List<Invoice> invoiceList = invoiceRepository.findAll(); 
		    List<InvoiceFindAllResponse> invoiceResponseList = new ArrayList<>();

		    for (Invoice invoice : invoiceList) {
		    	InvoiceFindAllResponse response = new InvoiceFindAllResponse();
		        response.setId(invoice.getId());
		        response.setInvoiceNumber(invoice.getInvoiceNumber());
		        response.setCustomerName(invoice.getCustomerName());
		        response.setTotalAmount(invoice.getTotalAmount());
		        response.setStatus(invoice.getStatus());
		        invoiceResponseList.add(response);
		    }
		    return invoiceResponseList; 
		}
}