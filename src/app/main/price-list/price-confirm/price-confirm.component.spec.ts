import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceConfirmComponent } from './price-confirm.component';

describe('PriceConfirmComponent', () => {
  let component: PriceConfirmComponent;
  let fixture: ComponentFixture<PriceConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriceConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
