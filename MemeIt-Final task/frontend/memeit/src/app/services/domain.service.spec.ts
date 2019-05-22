/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DomainService } from './domain.service';

describe('Service: Domain', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomainService]
    });
  });

  it('should ...', inject([DomainService], (service: DomainService) => {
    expect(service).toBeTruthy();
  }));
});
