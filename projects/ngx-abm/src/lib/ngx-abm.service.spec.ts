import { TestBed } from '@angular/core/testing';

import { NgxAbmService } from './ngx-abm.service';

describe('NgxAbmService', () => {
  let service: NgxAbmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxAbmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
