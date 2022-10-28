import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentConfirmComponent } from './component-confirm.component';

describe('ComponentConfirmComponent', () => {
  let component: ComponentConfirmComponent;
  let fixture: ComponentFixture<ComponentConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
