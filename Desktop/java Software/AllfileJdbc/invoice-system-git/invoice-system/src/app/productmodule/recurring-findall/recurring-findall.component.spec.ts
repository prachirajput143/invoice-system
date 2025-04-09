import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurringFindallComponent } from './recurring-findall.component';

describe('RecurringFindallComponent', () => {
  let component: RecurringFindallComponent;
  let fixture: ComponentFixture<RecurringFindallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecurringFindallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecurringFindallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
