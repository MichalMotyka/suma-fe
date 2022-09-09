import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresFormCityComponent } from './adres-form-city.component';

describe('AdresFormCityComponent', () => {
  let component: AdresFormCityComponent;
  let fixture: ComponentFixture<AdresFormCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresFormCityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresFormCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
