import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractConfirmComponent } from './contract-confirm.component';

describe('ContractConfirmComponent', () => {
  let component: ContractConfirmComponent;
  let fixture: ComponentFixture<ContractConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
