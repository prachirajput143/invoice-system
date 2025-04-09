package com.amstech.invoice.managment.controller;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.amstech.invoice.managment.entity.Invoice;
import com.amstech.invoice.managment.request.view.InvoiceRequest;
import com.amstech.invoice.managment.response.view.InvoiceFindAllResponse;
import com.amstech.invoice.managment.response.view.ResponseMessage;
import com.amstech.invoice.managment.service.InvoiceService;

@RestController
@RequestMapping("invoices")
public class InvoiceController {
	private final Logger LOGGER=LoggerFactory.getLogger(InvoiceController.class);
			
	    private final InvoiceService invoiceService;

	    public InvoiceController(InvoiceService invoiceService) {
	        this.invoiceService = invoiceService;
	       LOGGER.info("InvoiceController: Object Created");
	    }
	    
    @RequestMapping(method = RequestMethod.POST, value = "/create", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseMessage> createInvoice(@RequestBody InvoiceRequest invoiceRequest) {
        try {
            Invoice createdInvoice = invoiceService.createInvoice(invoiceRequest);
            Long totalRecords = invoiceService.getTotalInvoices();
            ResponseMessage response = new ResponseMessage(HttpStatus.CREATED, "Invoice created successfully.", totalRecords);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            ResponseMessage response = new ResponseMessage(HttpStatus.BAD_REQUEST, "Error creating invoice: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }
    }
    @RequestMapping(method = RequestMethod.PUT, value = "/update/{id}", consumes = "application/json", produces = "application/json")
    public ResponseEntity<ResponseMessage> updateInvoice(@PathVariable Long id, @RequestBody InvoiceRequest invoiceRequest) {
        try {
            Invoice updatedInvoice = invoiceService.updateInvoice(id, invoiceRequest);
            ResponseMessage response = new ResponseMessage(HttpStatus.OK, "Invoice updated successfully.");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ResponseMessage errorResponse = new ResponseMessage(HttpStatus.BAD_REQUEST, "Error updating invoice: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }
    @RequestMapping(method=RequestMethod.GET,value="/invoiceById/{id}",produces="application/json")
    public ResponseEntity<?> InvoiceById(@PathVariable Long id) {
        Invoice invoice = invoiceService.InvoiceById(id);
        if (invoice != null) {
            LOGGER.info("Invoice found with ID: {}", id);
            return ResponseEntity.ok(invoice);
        } else {
            LOGGER.error("Invoice not found with ID: {}", id);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invoice not found");
        }
    }
    @RequestMapping(method=RequestMethod.DELETE,value=("/softDelete/{id}"),produces="application/json")
    public ResponseEntity<String> softDeleteInvoice(@PathVariable Long id) {
    	try {
    	invoiceService.softDeleteInvoice(id);
    	return ResponseEntity.ok("Invoice soft deleted successfully.");
    }catch (RuntimeException e) {
        LOGGER.error("Error soft deleting invoice ID: {}", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
    
    @RequestMapping(method=RequestMethod.DELETE,value=("/restore/{id}"),produces="application/json")
    public ResponseEntity<String> restoreInvoice(@PathVariable Long id) {
    	try{
    	invoiceService.restoreInvoice(id);
        return ResponseEntity.ok("Invoice restored successfully.");
    }catch (RuntimeException e) {
        LOGGER.error("Error restoring  invoice ID: {}", id);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }
}
    @RequestMapping(method = RequestMethod.GET, value = "/findAll", produces = "application/json")
    public ResponseEntity<?> findAllInvoice() {
        LOGGER.info("Fetching all invoices.");
        try {
            List<InvoiceFindAllResponse> findAllResponses = invoiceService.findAll(); 
               if (findAllResponses.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No invoices found");
            }
            return ResponseEntity.ok(findAllResponses); 
        } catch (Exception e) {
        	LOGGER.error("Error fetching all invoices: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

}