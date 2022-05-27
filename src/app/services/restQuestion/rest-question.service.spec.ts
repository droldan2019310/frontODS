import { TestBed } from '@angular/core/testing';

import { RestQuestionService } from './rest-question.service';

describe('RestQuestionService', () => {
  let service: RestQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
