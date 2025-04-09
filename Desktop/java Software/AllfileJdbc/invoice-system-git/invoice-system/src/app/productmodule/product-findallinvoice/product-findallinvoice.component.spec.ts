import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFindallinvoiceComponent } from './product-findallinvoice.component';

describe('ProductFindallinvoiceComponent', () => {
  let component: ProductFindallinvoiceComponent;
  let fixture: ComponentFixture<ProductFindallinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFindallinvoiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFindallinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
