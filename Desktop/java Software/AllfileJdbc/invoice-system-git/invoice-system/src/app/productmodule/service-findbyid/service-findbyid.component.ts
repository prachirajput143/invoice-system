import { Component } from '@angular/core';
import { ServiceInvoiceService } from '../../services/service';

@Component({
  selector: 'app-service-findbyid',
  templateUrl: './service-findbyid.component.html',
  styleUrl: './service-findbyid.component.css',
  standalone:false
})
export class ServiceFindbyidComponent {
  constructor(private serviceinvoice: ServiceInvoiceService){}
  service: any = null; // सिंगल इनवॉइस के लिए
    searchId: number | null = null; // 
    findInvoiceById() {
      if (this.searchId) {
        this.serviceinvoice.findInvoiceById(this.searchId).subscribe(
          (response) => {
            console.log("Invoice Data Received: ", response);
            this.service = response.data;
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
