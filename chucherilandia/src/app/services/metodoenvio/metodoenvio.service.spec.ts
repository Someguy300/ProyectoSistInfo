import { TestBed } from '@angular/core/testing';

import { MetodoenvioService } from './metodoenvio.service';

describe('MetodoenvioService', () => {
  let service: MetodoenvioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MetodoenvioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
