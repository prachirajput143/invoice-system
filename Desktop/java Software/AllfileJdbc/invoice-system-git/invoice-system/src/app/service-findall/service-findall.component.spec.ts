import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFindallComponent } from './service-findall.component';

describe('ServiceFindallComponent', () => {
  let component: ServiceFindallComponent;
  let fixture: ComponentFixture<ServiceFindallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceFindallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceFindallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
