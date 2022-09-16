import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresInsideFormComponent } from './adres-inside-form.component';

describe('AdresInsideFormComponent', () => {
  let component: AdresInsideFormComponent;
  let fixture: ComponentFixture<AdresInsideFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresInsideFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresInsideFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
