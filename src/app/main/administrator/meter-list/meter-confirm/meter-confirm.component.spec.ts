import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterConfirmComponent } from './meter-confirm.component';

describe('MeterConfirmComponent', () => {
  let component: MeterConfirmComponent;
  let fixture: ComponentFixture<MeterConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeterConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
