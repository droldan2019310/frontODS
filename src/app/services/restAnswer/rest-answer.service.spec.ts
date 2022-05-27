import { TestBed } from '@angular/core/testing';

import { RestAnswerService } from './rest-answer.service';

describe('RestAnswerService', () => {
  let service: RestAnswerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestAnswerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
