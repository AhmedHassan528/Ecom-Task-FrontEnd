import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUseresComponent } from './all-useres.component';

describe('AllUseresComponent', () => {
  let component: AllUseresComponent;
  let fixture: ComponentFixture<AllUseresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUseresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUseresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
