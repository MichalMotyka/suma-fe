import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KontrahentConfirmComponent } from './kontrahent-confirm.component';

describe('KontrahentConfirmComponent', () => {
  let component: KontrahentConfirmComponent;
  let fixture: ComponentFixture<KontrahentConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KontrahentConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KontrahentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
