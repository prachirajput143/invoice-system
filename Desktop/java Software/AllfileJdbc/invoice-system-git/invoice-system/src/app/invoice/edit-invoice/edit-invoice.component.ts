import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../service/invoice.service';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrls: ['./edit-invoice.component.scss'],
  standalone: false
})
export class EditInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  paymentForm!: FormGroup;
  payments: any[] = [];

  invoiceId: number | null = null; 
  searchInvoiceNumber = '';

  customerName = '';
  customerEmail = '';
  customerPhone = '';

  subTotal = 0;
  tax = 0;
  grandTotal = 0;
  balance = 0;

  isPdfModalOpen = false;
  pdfPreviewUrl = '';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.initForms();
    this.listenToItemChanges();
  }

  initForms() {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([]),
      note: ['']
    });

    this.paymentForm = this.fb.group({
      paymentName: ['', Validators.required],
      paymentAmount: [0, [Validators.required, Validators.min(1)]],
      paymentDate: ['', Validators.required],
      paymentDetails: ['']
    });

    this.addItem();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem() {
    const item = this.fb.group({
      category: ['SERVICE', Validators.required],
      quantity: [0, Validators.required],
      price: [0, Validators.required],
      subtotal: [0],
      discount: [0],
      tax: [0],
      paid: [0],
      grandTotal: [0],
      total: [0],
    });

    this.items.push(item);
    this.setupAutoCalculationForItem(item);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.calculateInvoiceSummary();
  }

  listenToItemChanges() {
    this.items.controls.forEach(control => {
      this.setupAutoCalculationForItem(control as FormGroup);
    });
  }

  setupAutoCalculationForItem(item: FormGroup) {
    item.get('quantity')?.valueChanges.subscribe(() => this.updateItemCalculation(item));
    item.get('price')?.valueChanges.subscribe(() => this.updateItemCalculation(item));
    item.get('discount')?.valueChanges.subscribe(() => this.updateItemCalculation(item));
    item.get('tax')?.valueChanges.subscribe(() => this.updateItemCalculation(item));
    item.get('paid')?.valueChanges.subscribe(() => this.calculateInvoiceSummary());
  }

  updateItemCalculation(item: FormGroup) {
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const discount = item.get('discount')?.value || 0;
    const tax = item.get('tax')?.value || 0;

    const subtotal = quantity * price;
    const discountAmt = (discount / 100) * subtotal;
    const taxAmt = (tax / 100) * subtotal;
    const total = subtotal - discountAmt + taxAmt;

    item.patchValue({
      subtotal: subtotal,
      grandTotal: total,
      total: total
    }, { emitEvent: false });

    this.calculateInvoiceSummary();
  }

  calculateInvoiceSummary() {
    let subtotalSum = 0;
    let taxSum = 0;
    let grandTotalSum = 0;
    let paidSum = 0;

    this.items.controls.forEach(control => {
      const subtotal = control.get('subtotal')?.value || 0;
      const tax = control.get('tax')?.value || 0;
      const paid = control.get('paid')?.value || 0;
      const grandTotal = control.get('grandTotal')?.value || 0;

      subtotalSum += subtotal;
      taxSum += (subtotal * tax) / 100;
      grandTotalSum += grandTotal;
      paidSum += paid;
    });

    this.subTotal = subtotalSum;
    this.tax = taxSum;
    this.grandTotal = grandTotalSum;
    this.balance = grandTotalSum - paidSum;
  }

  addPayment() {
    if (this.paymentForm.invalid) {
      alert('Please enter valid payment details');
      return;
    }

    const paymentData = this.paymentForm.value;
    this.payments.push({
      paymentMethod: paymentData.paymentName,
      notes: paymentData.paymentDetails,
      amount: paymentData.paymentAmount,
      paymentDate: paymentData.paymentDate,
    });

    this.paymentForm.reset();
  }

  removePayment(index: number) {
    this.payments.splice(index, 1);
  }

  fetchInvoiceDetails() {
    if (!this.searchInvoiceNumber) {
      alert('Please enter invoice number!');
      return;
    }

    this.invoiceService.getInvoiceByNumber(this.searchInvoiceNumber).subscribe({
      next: (res: any) => {
        const invoice = res.data;
        this.invoiceId = invoice.id;
        this.customerName = invoice.customerName;
        this.customerEmail = invoice.customerEmail;
        this.customerPhone = invoice.customerPhone;

        this.invoiceForm.patchValue({ note: invoice.note });
        this.items.clear();

        (invoice.items || []).forEach((item: any) => {
          const formItem = this.fb.group({
            category: [item.category || 'SERVICE', Validators.required],
            quantity: [item.quantity || 0, Validators.required],
            price: [item.price || 0, Validators.required],
            subtotal: [item.subtotal || 0],
            discount: [item.discount || 0],
            tax: [item.tax || 0],
            paid: [item.paid || 0],
            grandTotal: [item.grandTotal || 0],
            total: [item.total || 0],
          });
          this.items.push(formItem);
          this.setupAutoCalculationForItem(formItem);
        });

        this.subTotal = invoice.subTotal || 0;
        this.tax = invoice.tax || 0;
        this.grandTotal = invoice.grandTotal || 0;
        this.balance = invoice.balance || 0;
        this.payments = invoice.payments || [];
      },
      error: (err) => {
        console.error('Fetch error', err);
        alert('Invoice not found');
      }
    });
  }

  updateInvoice() {
    if (!this.invoiceId || this.invoiceId <= 0) {
      alert('Invoice ID is missing or invalid. Please fetch a valid invoice first!');
      return;
    }

    const invoiceData = {
      id:this.invoiceId,
      customerPhone: this.customerPhone,
      client: {
        id:this.invoiceId,
        name: this.customerName,
        email: this.customerEmail,
        customerPhone: this.customerPhone,
      },
      items: this.invoiceForm.value.items,
      note: this.invoiceForm.get('note')?.value,
      payments: this.payments,
    };
console.log(invoiceData);

    this.invoiceService.updateInvoice( invoiceData).subscribe({
      next: (res: any) => {
        alert('Invoice updated successfully!');
        // this.pdfPreviewUrl = res.data.pdfUrl;
        // this.isPdfModalOpen = true;
      },
      error: (err) => {
        console.error('Update error', err);
        alert('Error updating invoice: ' + (err?.error?.message || 'Unknown error'));
      }
    });
  }

  saveInvoice() {
    const invoiceData = this.prepareInvoiceData();

    if (this.invoiceId && this.invoiceId > 0) {
      this.updateInvoice(); 
    } else {
      this.invoiceService.createInvoice(invoiceData).subscribe({
        next: (res: any) => {
          alert('Invoice created successfully!');
          this.invoiceId = res.data.id; 
          this.pdfPreviewUrl = res.data.pdfUrl;
          this.isPdfModalOpen = true;
          this.downloadPDF(this.pdfPreviewUrl);
        },
        error: (err) => {
          console.error('Create error', err);
          alert('Error creating invoice: ' + (err?.error?.message || 'Unknown error'));
        }
      });
    }
  }

  prepareInvoiceData() {
    return {
      client: {
        id:this.invoiceId,
        name: this.customerName,
        email: this.customerEmail,
        customerPhone: this.customerPhone,
      },
      items: this.invoiceForm.value.items,
      note: this.invoiceForm.get('note')?.value,
      payments: this.payments,
    };
  }

  printPDF(url: string) {
    const win = window.open(url, '_blank');
    if (win) {
      win.focus();
      win.print();
    }
  }

  downloadPDF(url: string) {
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${this.searchInvoiceNumber || 'updated'}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
