import { TestBed } from '@angular/core/testing';

import { PpeService } from './ppe.service';

describe('PpeService', () => {
  let service: PpeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PpeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
