import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingsFormComponent } from './readings-form.component';

describe('ReadingsFormComponent', () => {
  let component: ReadingsFormComponent;
  let fixture: ComponentFixture<ReadingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingsFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
