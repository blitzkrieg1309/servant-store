import { TestBed } from '@angular/core/testing';

import { RegisFormService } from './regis-form.service';

describe('RegisFormService', () => {
  let service: RegisFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegisFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
