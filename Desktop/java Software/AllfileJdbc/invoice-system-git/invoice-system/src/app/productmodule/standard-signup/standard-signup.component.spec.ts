import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardSignupComponent } from './standard-signup.component';


describe('StandardInoiveComponent', () => {
  let component: StandardSignupComponent;
  let fixture: ComponentFixture<StandardSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
