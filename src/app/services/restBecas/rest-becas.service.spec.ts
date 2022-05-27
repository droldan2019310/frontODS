import { TestBed } from '@angular/core/testing';

import { RestBecasService } from './rest-becas.service';

describe('RestBecasService', () => {
  let service: RestBecasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestBecasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
