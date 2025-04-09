import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsignupComponent } from './productsignup.component';

describe('ProductsignupComponent', () => {
  let component: ProductsignupComponent;
  let fixture: ComponentFixture<ProductsignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
