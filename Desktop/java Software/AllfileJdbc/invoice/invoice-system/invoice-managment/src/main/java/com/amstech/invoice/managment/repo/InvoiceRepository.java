
package com.amstech.invoice.managment.repo;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.amstech.invoice.managment.entity.Invoice;
import ch.qos.logback.core.net.server.Client;

@Repository
public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
	List<Invoice> findByInvoiceNumber(String invoiceNumber);

	 List<Invoice> findByDeletedFalse();
     
	 @Query("SELECT i FROM Invoice i WHERE i.deleted = false") 
	 public abstract List<Invoice> findAllInvoice();
	 
	 Optional<Invoice>findByClientId(long Id);

//		 @Query("SELECT i FROM Invoice i WHERE i.deleted = false")
//		    List<Invoice> findAllActiveInvoices();
	   
}
