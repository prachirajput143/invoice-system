import { Component } from '@angular/core';
import { ProformaInvoiceService } from '../../services/proforma-service';

@Component({
  selector: 'app-proforma-findbyid',
  standalone:false,
  templateUrl: './proforma-findbyid.component.html',
  styleUrl: './proforma-findbyid.component.css'
})
export class ProformaFindbyidComponent {
  constructor(private invoice: ProformaInvoiceService){}
      proformainvoice: any = null; // सिंगल इनवॉइस के लिए
        searchId: number | null = null; // 
        findInvoiceById() {
          if (this.searchId) {
            this.invoice.findInvoiceById(this.searchId).subscribe(
              (response) => {
                console.log("Invoice Data Received: ", response);
                this.proformainvoice = response.data;
              },
              (error) => {
                console.error('Error fetching invoice:', error);
                console.log("Full Error Response:", error.error);
        
                // ✅ Debugging check: देखो कि alert यहां तक पहुंच रहा है या नहीं
                console.log("Before alert");
                
                let errorMessage = "Invoice not found!";
                if (error.error && error.error.message) {
                  errorMessage = error.error.message;
                }
        
                alert(errorMessage); // ✅ Alert check करो
              }
            );
          } else {
            alert('Please enter a valid Invoice ID!');
          }
        }
    
    }
    
  
  
  


