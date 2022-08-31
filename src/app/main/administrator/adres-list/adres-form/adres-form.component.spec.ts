import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresFormComponent } from './adres-form.component';

describe('AdresFormComponent', () => {
  let component: AdresFormComponent;
  let fixture: ComponentFixture<AdresFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
