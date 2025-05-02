import { Component } from '@angular/core';
import { ProductInvoiceService } from '../../services/product-service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/client-service';
import { CompanyService } from '../../services/company-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-productsignup',
  templateUrl: './productsignup.component.html',
  styleUrls: ['./productsignup.component.css'],
  standalone: false
})
export class ProductsignupComponent {

  selectedClientId: string | null = null;
selectedCompanyId: string | null = null;

  invoiceForm!: FormGroup;
  paymentForm!: FormGroup;




  clients: any[] = [];
  companies: any[] = [];

  subTotal = 0;
  tax = 0;
  grandTotal = 0;
  balance = 0;
  totalAmount = 0;
  discount = 0;
  quantity = 0;
  paid = 0;

  customerEmail = '';
  customerPhone = '';
  customerName = '';

  payments: any[] = [];

  isPdfModalOpen = false;
  pdfPreviewUrl = '';

  constructor(
    private fb: FormBuilder,
    private invoiceService: ProductInvoiceService,
    private clientService: ClientService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
    this.loadCompanies();
  }

  initForm(): void {
    this.invoiceForm = this.fb.group({
      clientId: [null, Validators.required],  // Add clientId control
      companyId: [null, Validators.required],  // Add companyId control
      note: [''],
      items: this.fb.array([]),
    });

    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      paymentDetails: [''],
      paymentAmount: [0, Validators.required],
      paymentDate: ['', Validators.required],
    });

    this.addItem(); // Add one initial row
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  get noteControl(): FormControl {
    return this.invoiceForm.get('note') as FormControl;
  }

  addItem(): void {
    const index = this.items.length;

    const itemGroup = this.fb.group({
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      subtotal: [0],
      discount: [0],
      grandTotal: [0],
      paid: [0],
      tax: [0],
      total: [0],
    });

    // Push first, so index remains valid
    this.items.push(itemGroup);

    // Real-time calculation triggers
    itemGroup.get('quantity')?.valueChanges.subscribe(() => {
      this.calculateSubtotal(index);
    });

    itemGroup.get('price')?.valueChanges.subscribe(() => {
      this.calculateSubtotal(index);
    });

    itemGroup.get('discount')?.valueChanges.subscribe(() => {
      this.calculateTotal(index);
    });

    itemGroup.get('tax')?.valueChanges.subscribe(() => {
      this.calculateTotal(index);
    });
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.calculateInvoiceSummary();
  }

  calculateSubtotal(index: number): void {
    const item = this.items.at(index);
    const quantity = +item.get('quantity')?.value || 0;
    const price = +item.get('price')?.value || 0;
    const subtotal = quantity * price;

    item.get('subtotal')?.setValue(subtotal, { emitEvent: false });
    this.calculateTotal(index);
  }

  calculateTotal(index: number): void {
    const item = this.items.at(index);
    const subtotal = +item.get('subtotal')?.value || 0;
    const discount = +item.get('discount')?.value || 0;
    const tax = +item.get('tax')?.value || 0;

    const afterDiscount = subtotal - (subtotal * discount / 100);
    const taxAmount = afterDiscount * tax / 100;
    const total = afterDiscount + taxAmount;

    item.get('grandTotal')?.setValue(afterDiscount, { emitEvent: false });
    item.get('total')?.setValue(total, { emitEvent: false });

    this.calculateInvoiceSummary();
  }

  calculateInvoiceSummary(): void {
    let subtotal = 0, taxTotal = 0, grand = 0, quantitySum = 0, discountSum = 0;

    this.items.controls.forEach(item => {
      const sub = +item.get('subtotal')?.value || 0;
      const tax = +item.get('tax')?.value || 0;
      const grandSub = +item.get('grandTotal')?.value || 0;
      const total = +item.get('total')?.value || 0;
      const qty = +item.get('quantity')?.value || 0;
      const discount = +item.get('discount')?.value || 0;

      subtotal += sub;
      taxTotal += (tax * grandSub) / 100;
      grand += total;
      quantitySum += qty;
      discountSum += discount;
    });

    this.subTotal = subtotal;
    this.tax = taxTotal;
    this.grandTotal = grand;
    this.totalAmount = grand;
    this.quantity = quantitySum;
    this.discount = discountSum;

    const paid = this.payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    this.paid = paid;
    this.balance = this.grandTotal - paid;
  }

  loadClients(): void {
    this.clientService.getAllClients(0, 100).subscribe({
      next: (res: { data: any[] }) => {
        console.log('Clients:', res.data); // Debug log to check the data structure
        this.clients = res.data;
      },
      error: err => console.error('Error loading clients:', err)
    });
  }
  
  loadCompanies(): void {
    this.companyService.getAllCompanies(0, 100).subscribe({
      next: (res: { data: any[] }) => {
        console.log('Companies:', res.data); // Debug log to check the data structure
        this.companies = res.data;
      },
      error: err => console.error('Error loading companies:', err)
    });
  }
  

  addPayment(): void {
    if (this.paymentForm.invalid) return;

    const payment = this.paymentForm.value;
    this.payments.push({
      paymentMethod: payment.paymentMethod,
      notes: payment.paymentDetails,
      amount: payment.paymentAmount,
      paymentDate: payment.paymentDate
    });

    this.paymentForm.reset();
    this.calculateInvoiceSummary();
  }

  removePayment(index: number): void {
    this.payments.splice(index, 1);
    this.calculateInvoiceSummary();
  }
  saveInvoice(): void {
    if (!this.selectedClientId || !this.selectedCompanyId) {
      this.snackBar.open('Please select both Client and Company!', 'Close', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
  
    const payload = {
      clientId: this.selectedClientId,
      companyId: this.selectedCompanyId,
      items: this.invoiceForm.value.items,
      payments: this.payments,
      subTotal: this.subTotal,
      tax: this.tax,
      discount: this.discount,
      totalAmount: this.totalAmount,
      quantity: this.quantity,
      grandTotal: this.grandTotal,
      paid: this.paid,
      balance: this.balance,
      customerName: this.customerName,
      customerEmail: this.customerEmail,
      customerPhone: this.customerPhone,
      note: this.noteControl.value,
      paymentStatus: '',
      productCode: '',
      category: ''
    };
  
    this.invoiceService.signupInvoice(payload).subscribe({
      next: (res) => {
        if (res?.data?.pdfUrl) {
          const pdfUrl = res.data.pdfUrl;
          const invoiceNumber = res.data.invoice?.invoiceNumber || 'invoice';
          const filename = `invoice-${invoiceNumber}.pdf`;
  
          this.downloadPDF(pdfUrl, filename);
          this.printPDF(pdfUrl);
  
          this.snackBar.open('Invoice saved successfully!', 'Close', {
            duration: 3000,
            verticalPosition: 'top'
          });
        } else {
          console.error('PDF URL not found in response.');
        }
      },
      error: (err) => {
        console.error('Error saving invoice:', err);
        this.snackBar.open('Something went wrong while saving the invoice.', 'Close', {
          duration: 3000,
          verticalPosition: 'top'
        });
      }
    });
  }
  
  
  downloadPDF(pdfUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // PDF Print Logic
  printPDF(pdfUrl: string): void {
    const printWindow = window.open(pdfUrl, '_blank');
    if (printWindow) {
      printWindow.focus();
      printWindow.print();
    } else {
      console.error('Failed to open print window.');
    }
  }
  
  
}
