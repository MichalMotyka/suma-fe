import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtFormComponent } from './ot-form.component';

describe('OtFormComponent', () => {
  let component: OtFormComponent;
  let fixture: ComponentFixture<OtFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
