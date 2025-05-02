import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductInvoiceUpdateComponent } from './update-invoice.component';

describe('ProductInvoiceUpdateComponent', () => {
  let component: ProductInvoiceUpdateComponent;
  let fixture: ComponentFixture<ProductInvoiceUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductInvoiceUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductInvoiceUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
