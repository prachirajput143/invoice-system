import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardFindbyidComponent } from './standard-findbyid.component';

describe('StandardFindbyidComponent', () => {
  let component: StandardFindbyidComponent;
  let fixture: ComponentFixture<StandardFindbyidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardFindbyidComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardFindbyidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
