import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  standalone: false
})
export class InvoiceCreateComponent implements OnInit {
  invoiceForm!: FormGroup;
  invoiceTypes: string[] = ['Standard Invoice', 'Recurring Invoice', 'Service Invoice', 'Product Invoice', 'Proforma Invoice'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.invoiceForm = this.fb.group({
      invoiceId: [{ value: this.generateInvoiceId(), disabled: true }, Validators.required],
      invoiceType: ['', Validators.required],
      customerName: ['', Validators.required],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerContact: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      invoiceDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      from: ['Your Company Name', Validators.required],
      to: ['', Validators.required],
      items: this.fb.array([]),
      discount: [0, [Validators.min(0), Validators.max(100)]],
      tax: [0, [Validators.min(0), Validators.max(100)]],
      note: [''],
      currency: ['USD']
    });
    this.addItem();
  }

  generateInvoiceId(): string {
    return 'INV-' + Math.floor(1000 + Math.random() * 9000);
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const item = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      total: [{ value: 0, disabled: true }]
    });
    this.items.push(item);
    this.calculateTotal();
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateTotal();
  }

  calculateTotal() {
    let subtotal = 0;
    this.items.controls.forEach((item) => {
      const qty = item.get('quantity')?.value || 0;
      const price = item.get('price')?.value || 0;
      const total = qty * price;
      item.get('total')?.setValue(total, { emitEvent: false });
      subtotal += total;
    });

    const discount = this.invoiceForm.get('discount')?.value || 0;
    const tax = this.invoiceForm.get('tax')?.value || 0;
    const discountAmount = (subtotal * discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * tax) / 100;
    const grandTotal = subtotal - discountAmount + taxAmount;

    return { subtotal, discountAmount, taxAmount, grandTotal };
  }

  onSubmit(action: string) {
    if (this.invoiceForm.valid) {
      const invoiceData = { ...this.invoiceForm.value, totals: this.calculateTotal() };
      console.log(`Invoice ${action}:`, invoiceData);
      alert(`Invoice ${action} successfully!`);
    } else {
      alert('Please fill all required fields!');
    }
  }
}