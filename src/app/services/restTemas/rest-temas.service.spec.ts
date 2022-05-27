import { TestBed } from '@angular/core/testing';

import { RestTemasService } from './rest-temas.service';

describe('RestTemasService', () => {
  let service: RestTemasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestTemasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
