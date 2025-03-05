package com.amstech.invoice.managment.service;

import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.amstech.invoice.managment.converter.entity.GenerateInvoioceConverter;
import com.amstech.invoice.managment.converter.entity.InvoiceModelToEntityConverter;
import com.amstech.invoice.managment.entity.Invoice;
import com.amstech.invoice.managment.repo.ClientRepo;
import com.amstech.invoice.managment.repo.InvoiceRepository;
import com.amstech.invoice.managment.request.view.generateInvoiceRequest;
import com.amstech.invoice.managment.response.view.InvoiceFindAllResponse;
import com.amstech.invoice.managment.response.view.ResponseMessage;

@Service
public class GenerateInvoiceService{
	private final Logger LOGGER=LoggerFactory.getLogger(GenerateInvoiceService.class);
	
	@Autowired
	private ClientRepo clientRepo;

	@Autowired
	private InvoiceRepository invoiceRepository;
	
	 public GenerateInvoiceService(InvoiceRepository invoiceRepository) {
	        this.invoiceRepository=invoiceRepository;
	    }
	
	public Optional<Invoice>findInvoiceByUserId(Long clientId){
		return invoiceRepository.findByClientId(clientId);
	}
	
	//generateInvoice
	public ResponseMessage generateInvoice(generateInvoiceRequest generateInvoiceRequest){
		Optional<Invoice>existingInvoice=invoiceRepository.findByClientId(generateInvoiceRequest.getUserId());
		if (existingInvoice.isPresent()) {
			return new ResponseMessage(HttpStatus.NOT_FOUND,"No existing invoice found for this user.");
		}
	    Invoice invoice = GenerateInvoioceConverter.GenerateConverter(generateInvoiceRequest, existingInvoice);
		invoiceRepository.save(invoice);
		return new ResponseMessage(HttpStatus.OK,"Invoice generated successfully.");
		}
	//update Invoice
	  public ResponseMessage UpdateInvoice(generateInvoiceRequest generateInvoiceRequest,Long invoiceId) {
		  Optional<Invoice>existingInvoice=invoiceRepository.findByClientId(invoiceId);
		  if (!existingInvoice.isPresent()) {
				return new ResponseMessage(HttpStatus.NOT_FOUND,"Invoice not found with ID:"+invoiceId);
			} 
		  Invoice invoice=GenerateInvoioceConverter.UpdateConerter(generateInvoiceRequest, existingInvoice);
	        invoiceRepository.save(invoice);
			return new ResponseMessage(HttpStatus.OK,"Invoice updated successfully!");
	  }
	  //findAllInvoice
	  public List<Invoice> getAllInvoices() {
	        LOGGER.info("Fetching all invoices.");
	        return invoiceRepository.findAllInvoice();
	    }
	  //SoftDelete
	  public String softDeleteInvoice(Long id) {
		  Optional<Invoice>optionalInvoice=invoiceRepository.findByClientId(id);
		  if (optionalInvoice.isPresent()) {
			  Invoice invoice= optionalInvoice.get();
			  invoice.setDeleted(true);
			  invoiceRepository.save(invoice);
			  return "Invoice deleted successfully!";
		}else {
			throw new RuntimeException("Invoice Not Found");
		}
	  }
		//HardDelete
		public ResponseEntity<String>hardDelete(Long id) {
			Optional<Invoice>optionalInvoice=invoiceRepository.findByClientId(id);
			  if (optionalInvoice.isPresent()) {
				invoiceRepository.deleteById(id);  //Permanent removes from DB
				return ResponseEntity.ok("Invoice deleted permanently!");
			}else {
			    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invoice Not Found");
			}
	  }	
		 public void restoreInvoice(Long id) {
			 Optional<Invoice> optionalInvoice = invoiceRepository.findByClientId(id);
			 if (optionalInvoice.isPresent()) {
		            Invoice invoice = optionalInvoice.get();
		            invoice.setDeleted(false);
		            invoiceRepository.save(invoice);
		            LOGGER.info("Invoice restored successfully with ID: {}", id);
		        } else {
		            throw new RuntimeException("Invoice not found");
		        }
		    }
	}
