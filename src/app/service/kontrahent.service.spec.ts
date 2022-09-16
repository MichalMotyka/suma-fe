import { TestBed } from '@angular/core/testing';

import { KontrahentService } from './kontrahent.service';

describe('KontrahentService', () => {
  let service: KontrahentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KontrahentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
