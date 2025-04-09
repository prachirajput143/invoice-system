import { Component } from '@angular/core';
import { ProductInvoiceService } from '../../services/product-service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-productsignup',
  templateUrl: './productsignup.component.html',
  styleUrls: ['./productsignup.component.css'],
  standalone:false
})
export class ProductsignupComponent {
  signupForm: FormGroup;
  invoices: any[] = []; // ✅ Correct variable name

  product: any = null; // सिंगल इनवॉइस के लिए
  searchId: number | null = null; // 
  constructor(
    private invoiceService: ProductInvoiceService,
    private router: Router,
    private formbuilder: FormBuilder
  ) {
    this.signupForm = this.formbuilder.group({
      accountDetails: '',
      buyerDetails: '',
      dueDate: '',
      handlingCosts: 0,
      orderNumber: '',
      paymentMethod: '',
      paymentTerm: '',
      shipping: 0,
      supplier: '',
      taxCalculation: 0,
      totalPayable: 0,
      id:''
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const signupdata = this.signupForm.value;
      
      console.log("Form Data: ", signupdata); // ✅ Check console if data is correct

      this.invoiceService.signupInvoice(signupdata).subscribe(
        (response) => {
          console.log("Signup Success: ", response);

          alert("Invoice Successfully Submitted!");
          this.signupForm.reset();
        },
        (error) => {
          console.error("Signup Failed: ", error);
          alert("Signup Failed: " + (error.error?.message || "Something went wrong!"));
        }
      );
    } else {
      alert("Form is not valid!");
    }

    
 
  }
  // findInvoiceById() {
  //   if (this.searchId) {
  //     this.invoiceService.findInvoiceById(this.searchId).subscribe(
  //       (response) => {
  //         console.log("Invoice Data Received: ", response);
  //         this.product = response.data; // ✅ Correct: Extract 'data'
  //       },
  //       (error) => {
  //         console.error('Error fetching invoice', error);
  //         alert('Invoice not found!');
  //       }
  //     );
  //   } else {
  //     alert('Please enter a valid Invoice ID!');
  //   }
  // }
  
  // totalRecords: number = 0; // Total invoices count
  // page: number = 1;
  // size: number = 10;
  
  // findAllInvoices() {
  //   this.invoiceService.findAllInvoices(this.page, this.size).subscribe(
  //     (response) => {
  //       console.log('Invoices:', response);
  //       this.invoices = response.data || [];
  //       this.totalRecords = response.totalRecords || 0; // ✅ Total invoices set karein
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //       this.invoices = [];
  //       this.totalRecords = 0;
  //     }
  //   );
  // }
  // nextPage() {
  //   if ((this.page * this.size) < this.totalRecords) {
  //     this.page++;
  //     this.findAllInvoices();
  //   }
  // }
  
  // previousPage() {
  //   if (this.page > 1) {
  //     this.page--;
  //     this.findAllInvoices();
  //   }
  // }
  
}  