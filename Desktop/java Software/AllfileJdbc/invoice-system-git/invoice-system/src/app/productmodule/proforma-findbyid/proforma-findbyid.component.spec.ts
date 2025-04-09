import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProformaFindbyidComponent } from './proforma-findbyid.component';

describe('ProformaFindbyidComponent', () => {
  let component: ProformaFindbyidComponent;
  let fixture: ComponentFixture<ProformaFindbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProformaFindbyidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProformaFindbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
