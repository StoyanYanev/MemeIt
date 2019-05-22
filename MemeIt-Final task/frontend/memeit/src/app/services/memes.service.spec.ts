import { TestBed } from '@angular/core/testing';

import { MemesService } from './memes.service';

describe('MemesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemesService = TestBed.get(MemesService);
    expect(service).toBeTruthy();
  });
});
