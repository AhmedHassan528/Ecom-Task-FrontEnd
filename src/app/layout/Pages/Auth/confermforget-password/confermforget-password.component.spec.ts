import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfermforgetPAsswordComponent } from './confermforget-password.component';

describe('ConfermforgetPAsswordComponent', () => {
  let component: ConfermforgetPAsswordComponent;
  let fixture: ComponentFixture<ConfermforgetPAsswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfermforgetPAsswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfermforgetPAsswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
