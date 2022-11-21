import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtConfirmComponent } from './ot-confirm.component';

describe('OtConfirmComponent', () => {
  let component: OtConfirmComponent;
  let fixture: ComponentFixture<OtConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
