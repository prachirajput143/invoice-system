import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringSignupComponent } from './recurring-signup.component';

describe('RecurringSignupComponent', () => {
  let component: RecurringSignupComponent;
  let fixture: ComponentFixture<RecurringSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
