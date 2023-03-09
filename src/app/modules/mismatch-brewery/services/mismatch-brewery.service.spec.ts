import { TestBed } from '@angular/core/testing';

import { MismatchBreweryService } from './mismatch-brewery.service';

describe('MismatchBreweryService', () => {
  let service: MismatchBreweryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MismatchBreweryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
