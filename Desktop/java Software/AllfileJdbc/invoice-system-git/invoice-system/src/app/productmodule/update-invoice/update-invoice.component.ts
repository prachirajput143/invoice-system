import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductInvoiceService } from '../../services/product-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css'],
  standalone: false
})
export class ProductUpdateInvoiceComponent implements OnInit {
  updateForm!: FormGroup;
  invoiceId!: number; // 🔹 Invoice ID store karne ke liye variable
  invoiceData: any = {};  // ✅ Corrected invoices property

  constructor(
    private fb: FormBuilder,
    private productService: ProductInvoiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    console.log('Route Snapshot:', this.route.snapshot.paramMap);
  
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Extracted ID:', id); // ✅ Check ID value in console
  
    if (id) {
      this.invoiceId = Number(id);
    } else {
      console.error('Error: ID not received in Update Component!'); // ⚠ Debugging Error
    }
  }
  
  updateInvoice() {
    if (!this.invoiceId) {
      console.error('Invoice ID is undefined! Cannot update.');
      return;
    }

    this.productService.updateProduct(this.invoiceData, this.invoiceId).subscribe((response) => {
      console.log('Invoice Updated Successfully:', response);
      this.router.navigate(['/invoices']); // ✅ Redirect to Invoice List after update
    }, (error) => {
      console.error('Error updating invoice:', error);
    });
  }
}
