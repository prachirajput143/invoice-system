import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringFindbyidComponent } from './recurring-findbyid.component';

describe('RecurringFindbyidComponent', () => {
  let component: RecurringFindbyidComponent;
  let fixture: ComponentFixture<RecurringFindbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringFindbyidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringFindbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
