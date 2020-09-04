import { TestBed } from '@angular/core/testing';

import { CircularServiceService } from './circular-service.service';

describe('CircularServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CircularServiceService = TestBed.get(CircularServiceService);
    expect(service).toBeTruthy();
  });
});
