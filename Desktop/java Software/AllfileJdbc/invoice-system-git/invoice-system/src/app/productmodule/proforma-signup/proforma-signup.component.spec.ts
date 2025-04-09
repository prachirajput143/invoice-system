import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaSignupComponent } from './proforma-signup.component';

describe('ProformaSignupComponent', () => {
  let component: ProformaSignupComponent;
  let fixture: ComponentFixture<ProformaSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProformaSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProformaSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
