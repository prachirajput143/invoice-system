import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { InvoiceService } from '../service/invoice.service';
import { ClientService } from '../service/client.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  standalone:false
})
export class CreateInvoiceComponent{
  
  invoiceForm!: FormGroup;
  paymentForm!: FormGroup;

  clients: any[] = [];
  companies: any[] = [];

  selectedClientId: number | null = null;
  selectedCompanyId: number | null = null;

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

  // paymentForm = {
  //   paymentMethod: '',
  //   paymentDetails: '',
  //   paymentAmount: 0,
  //   paymentDate: ''
  // };

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private companyService: CompanyService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadClients();
    this.loadCompanies();
  }

  initForm(): void {
    this.invoiceForm = this.fb.group({
      note: [''],
      items: this.fb.array([])
    });
    this.paymentForm = this.fb.group({
      paymentMethod: ['', Validators.required],
      paymentDetails: [''],
      paymentAmount: [0, Validators.required],
      paymentDate: ['', Validators.required]
    });

    this.addItem(); // Add one initial row
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const itemGroup = this.fb.group({
      category: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      subtotal: [0],
      discount: [0],
      grandTotal: [0],
      paid: [0],
      tax: [0],
      total: [0]
    });

    this.items.push(itemGroup);
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
      next: (res: { data: any[] }) => this.clients = res.data,
      error: err => console.error('Error loading clients:', err)
    });
  }

  loadCompanies(): void {
    this.companyService.getAllCompanies(0, 100).subscribe({
      next: (res: { data: any[] }) => this.companies = res.data,
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
      paymentStatus: '', // Optional logic
      productCode: '',
      category: ''
    };

    this.invoiceService.createInvoice(payload).subscribe({
      next: res => {
        this.pdfPreviewUrl = res.pdfUrl;
        this.isPdfModalOpen = true;
        alert('Invoice & Payment saved successfully');
      },
      error: err => {
        console.error('Error saving invoice:', err);
        alert('Failed to save invoice');
      }
    });
  }

  createAndDownloadPDF(): void {
    const payload = {
      clientId: this.selectedClientId,
      companyId: this.selectedCompanyId,
      items: this.invoiceForm.value.items,
      payments: this.payments
    };

    this.invoiceService.generatePDF(payload).subscribe(res => {
      this.pdfPreviewUrl = res.pdfUrl;
      this.isPdfModalOpen = true;
    });
  }
}
