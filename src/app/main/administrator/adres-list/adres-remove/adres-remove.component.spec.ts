import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresRemoveComponent } from './adres-remove.component';

describe('AdresRemoveComponent', () => {
  let component: AdresRemoveComponent;
  let fixture: ComponentFixture<AdresRemoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdresRemoveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresRemoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
