import { TestBed } from '@angular/core/testing';

import { CountryFormServiceService } from './country-form-service.service';

describe('CountryFormServiceService', () => {
  let service: CountryFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
