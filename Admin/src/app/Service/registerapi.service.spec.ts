import { TestBed } from '@angular/core/testing';

import { RegisterapiService } from './registerapi.service';

describe('RegisterapiService', () => {
  let service: RegisterapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisterapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
