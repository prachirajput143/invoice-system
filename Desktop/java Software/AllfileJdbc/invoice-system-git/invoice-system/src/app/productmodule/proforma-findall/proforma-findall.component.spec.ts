import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaFindallComponent } from './proforma-findall.component';

describe('ProformaFindallComponent', () => {
  let component: ProformaFindallComponent;
  let fixture: ComponentFixture<ProformaFindallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProformaFindallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProformaFindallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
