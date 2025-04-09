import { Component } from '@angular/core';
import { ProductInvoiceService } from '../../services/product-service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-product-find-by-id',
 standalone:false,
  templateUrl: './product-find-by-id.component.html',
  styleUrl: './product-find-by-id.component.css'
})
export class ProductFindByIdComponent {
  constructor(private invoiceService: ProductInvoiceService, private router: Router,
    private formbuilder: FormBuilder) { }

    product: any = null; // सिंगल इनवॉइस के लिए
    searchId: number | null = null; // 
    findInvoiceById() {
      if (this.searchId) {
        this.invoiceService.findInvoiceById(this.searchId).subscribe(
          (response) => {
            console.log("Invoice Data Received: ", response);
            this.product = response.data;
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