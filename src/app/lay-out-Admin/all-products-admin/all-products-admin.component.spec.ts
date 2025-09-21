import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProductsAdminComponent } from './all-products-admin.component';

describe('AllProductsAdminComponent', () => {
  let component: AllProductsAdminComponent;
  let fixture: ComponentFixture<AllProductsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllProductsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllProductsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
