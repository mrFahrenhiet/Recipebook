import { TestBed } from '@angular/core/testing';

import { ShopiingListService } from './shopiing-list.service';

describe('ShopiingListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShopiingListService = TestBed.get(ShopiingListService);
    expect(service).toBeTruthy();
  });
});
