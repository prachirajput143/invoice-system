import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductUpdateInvoiceComponent } from './update-invoice.component';

describe('ProductUpdateInvoiceComponent', () => {
  let component: ProductUpdateInvoiceComponent;
  let fixture: ComponentFixture<ProductUpdateInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductUpdateInvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductUpdateInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
