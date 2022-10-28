import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TariffConfirmComponent } from './tariff-confirm.component';

describe('TariffConfirmComponent', () => {
  let component: TariffConfirmComponent;
  let fixture: ComponentFixture<TariffConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TariffConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TariffConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
