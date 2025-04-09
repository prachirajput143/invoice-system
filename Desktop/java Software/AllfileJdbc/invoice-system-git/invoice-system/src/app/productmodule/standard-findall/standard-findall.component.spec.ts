import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StandardFindallComponent } from './standard-findall.component';


describe('ServiceFindallComponent', () => {
  let component: StandardFindallComponent;
  let fixture: ComponentFixture<StandardFindallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandardFindallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandardFindallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
