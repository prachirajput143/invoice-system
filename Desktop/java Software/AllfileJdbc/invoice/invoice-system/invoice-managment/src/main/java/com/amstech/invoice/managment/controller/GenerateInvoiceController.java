package com.amstech.invoice.managment.controller;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.amstech.invoice.managment.entity.Invoice;
import com.amstech.invoice.managment.repo.InvoiceRepository;
import com.amstech.invoice.managment.request.view.generateInvoiceRequest;
import com.amstech.invoice.managment.response.view.ResponseMessage;
import com.amstech.invoice.managment.service.GenerateInvoiceService;
import com.amstech.invoice.managment.service.InvoiceService;

@RestController
@RequestMapping("generateinvoice")
public class GenerateInvoiceController {
	private final Logger LOGGER=LoggerFactory.getLogger(GenerateInvoiceController.class);
	
    private InvoiceRepository invoiceRepository;
	
	 @Autowired
	 private GenerateInvoiceService generateInvoiceService;
	 
	 public GenerateInvoiceController( InvoiceRepository invoiceRepository) {
	        this.generateInvoiceService = generateInvoiceService;
	        LOGGER.info("GenerateInvoiceController: Object Created");
	 }
	 //invoice will be generate only if invoice already exist
   @RequestMapping(method=RequestMethod.POST,value="/invoice", consumes = "application/json",produces="application/json")
   public ResponseEntity<ResponseMessage>generateInvoice(@RequestBody generateInvoiceRequest generateInvoiceRequest){
	   LOGGER.info("Fetching Data From Invoice");
	   ResponseMessage message=generateInvoiceService.generateInvoice(generateInvoiceRequest);
	   LOGGER.info("Invoice generated successfully.");
	   return ResponseEntity.status(HttpStatus.CREATED).body(message);
   }

   @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}", consumes = "application/json", produces = "application/json")
	 public ResponseEntity<ResponseMessage>UpdateInvoice(@RequestBody generateInvoiceRequest generateInvoiceRequest,@PathVariable Long invoiceId){
       LOGGER.info("request to be update invoice with ID: {}", invoiceId);
	   ResponseMessage message=generateInvoiceService.UpdateInvoice(generateInvoiceRequest, invoiceId);
	   LOGGER.info("updated successfully with ID: {}", invoiceId);
	   return ResponseEntity.ok(message);
   }
   @RequestMapping(method = RequestMethod.GET, value = "/findAll", produces = "application/json")
   public List<Invoice> getAllInvoices() {
	   LOGGER.info("Fetching all invoices.");
       return generateInvoiceService.getAllInvoices();
   }
   @RequestMapping(method=RequestMethod.DELETE,value=("/softDelete/{id}"),produces="application/json")
   public ResponseEntity<String>softDeleteInvoice(@PathVariable Long id){
	   try {
		   String string=generateInvoiceService.softDeleteInvoice(id);
		   LOGGER.info("soft deleted successfully with ID: {}", id);
		   return ResponseEntity.ok(string);
	   }catch(Exception e){
		   LOGGER.error("Error soft deleting invoice ID:{}", id);
		   return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
	   }
   }
   @RequestMapping(method=RequestMethod.DELETE,value=("/hardDelete/{id}"),produces="application/json")
   public ResponseEntity<String>hardDelete(@PathVariable Long id){
	   return generateInvoiceService.hardDelete(id);
   }
   
   @RequestMapping(method=RequestMethod.DELETE,value=("/restore/{id}"),produces="application/json")
   public ResponseEntity<String> restoreInvoice(@PathVariable Long id) {
   	try{
   		generateInvoiceService.restoreInvoice(id);
        LOGGER.info("restored successfully with ID: {} ", id);
       return ResponseEntity.ok("Invoice restored successfully.");
   }catch (RuntimeException e) {
	   LOGGER.error("Error while restoring invoice ID: {}", id);
       return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
   }
}
   
}