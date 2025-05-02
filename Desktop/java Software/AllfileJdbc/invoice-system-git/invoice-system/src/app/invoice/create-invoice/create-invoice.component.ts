import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ClientService } from '../service/client.service';
import { CompanyService } from '../service/company.service';
import { InvoiceService } from '../service/invoice.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.scss'],
  standalone: false
})
export class CreateInvoiceComponent implements OnInit {
  invoiceForm!: FormGroup;
  paymentForm!: FormGroup;

  clients = [{ id: 1, firstName: 'Amit' }, { id: 2, firstName: 'Ravi' }];
  companies = [{ id: 1, name: 'Tech Corp' }, { id: 2, name: 'Code Ltd' }];
  selectedClientId: any;
  selectedCompanyId: any;

  customerName = '';
  customerEmail = '';
  customerContact = '';

  payments: any[] = [];

  subTotal = 0;
  tax = 0;
  grandTotal = 0;
  balance = 0;

  pdfPreviewUrl = '';
  isPdfModalOpen = false;

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private companyService: CompanyService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      items: this.fb.array([]),
      note: ['']
    });
    

    this.paymentForm = this.fb.group({
      paymentName: ['', Validators.required],
      paymentDetails: [''],
      paymentAmount: [null, Validators.required],
      paymentDate: ['', Validators.required]
    });

    this.addItem(); // Add initial row
    this.loadClients();
    this.loadCompanies();
  }

  get items(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  addItem(): void {
    const item = this.fb.group({
      category: ['', Validators.required],
      quantity: [1, Validators.required],
      price: [0, Validators.required],
      subtotal: [{ value: 0, disabled: true }],
      discount: [0],
      tax: [0],
      paid: [0],
      grandTotal: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }]
    });
    this.items.push(item);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
    this.updateInvoiceSummary();
  }

  calculateSubtotal(i: number): void {
    const item = this.items.at(i);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const subtotal = quantity * price;
    item.get('subtotal')?.setValue(subtotal);
    this.calculateTotal(i);
  }

  calculateTotal(i: number): void {
    const item = this.items.at(i);
    const quantity = item.get('quantity')?.value || 0;
    const price = item.get('price')?.value || 0;
    const discount = item.get('discount')?.value || 0;
    const tax = item.get('tax')?.value || 0;

    const subtotal = quantity * price;
    const discountAmt = (discount / 100) * subtotal;
    const taxAmt = (tax / 100) * subtotal;

    const total = subtotal - discountAmt + taxAmt;
    const grandTotal = total;

    item.get('subtotal')?.setValue(subtotal);
    item.get('total')?.setValue(total);
    item.get('grandTotal')?.setValue(grandTotal);

    this.updateInvoiceSummary();
  }

  updateInvoiceSummary(): void {
    this.subTotal = 0;
    this.tax = 0;
    this.grandTotal = 0;

    this.items.controls.forEach(control => {
      const subtotal = control.get('subtotal')?.value || 0;
      const taxValue = control.get('tax')?.value || 0;
      const taxAmt = (taxValue / 100) * subtotal;
      const discount = control.get('discount')?.value || 0;
      const discountAmt = (discount / 100) * subtotal;

      const total = subtotal - discountAmt + taxAmt;

      this.subTotal += subtotal;
      this.tax += taxAmt;
      this.grandTotal += total;
    });

    const paidAmount = this.items.controls.reduce((sum, ctrl) => sum + (+ctrl.get('paid')?.value || 0), 0);
    this.balance = this.grandTotal - paidAmount;
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
    if (this.paymentForm.valid) {
      const values = this.paymentForm.value;

      this.payments.push({
        paymentMethod: values.paymentName,
        notes: values.paymentDetails,
        amount: values.paymentAmount,
        paymentDate: values.paymentDate
      });

      this.paymentForm.reset();
    }
  }

  removePayment(index: number): void {
    this.payments.splice(index, 1);
  }

  saveInvoice(): void {
    console.log('Invoice saved:', this.invoiceForm.value);
    console.log('Payments:', this.payments);
    // Send to backend here
  }

  printPDF(url: string): void {
    this.isPdfModalOpen = true;
    this.pdfPreviewUrl = url;
  }
}
