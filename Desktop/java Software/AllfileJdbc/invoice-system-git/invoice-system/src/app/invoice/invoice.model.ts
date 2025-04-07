export interface Invoice {
    clientId: number;
    companyId: number;
    items: any[];
    payments: any[];
    subTotal: number;
    tax: number;
    grandTotal: number;
    discount: number;
    totalAmount: number;
    quantity: number;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    note:string;
  }
  