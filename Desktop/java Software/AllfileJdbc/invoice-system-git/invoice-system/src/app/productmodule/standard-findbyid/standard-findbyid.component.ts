import { Component } from '@angular/core';
import { StandardInvoiceService } from '../../services/standard-service';

@Component({
  selector: 'app-standard-findbyid',
  templateUrl: './standard-findbyid.component.html',
  styleUrl: './standard-findbyid.component.css',
  standalone:false
})
export class StandardFindbyidComponent {
   constructor(private invoice: StandardInvoiceService){}
    standardinvoice: any = null; // सिंगल इनवॉइस के लिए
      searchId: number | null = null; // 
      findInvoiceById() {
        if (this.searchId) {
          this.invoice.findInvoiceById(this.searchId).subscribe(
            (response) => {
              console.log("Invoice Data Received: ", response);
              this.standardinvoice = response.data;
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
  


