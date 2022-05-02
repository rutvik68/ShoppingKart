import { TestBed } from '@angular/core/testing';

import { ApiproductService } from './apiproduct.service';

describe('ApiproductService', () => {
  let service: ApiproductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiproductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
