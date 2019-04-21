import { TestBed } from '@angular/core/testing';

import { TodocurrentService } from './todocurrent.service';

describe('TodocurrentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TodocurrentService = TestBed.get(TodocurrentService);
    expect(service).toBeTruthy();
  });
});
