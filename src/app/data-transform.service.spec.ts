import { TestBed, inject } from '@angular/core/testing';

import { DataTransformService } from './data-transform.service';

describe('DataTransformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTransformService]
    });
  });

  it('should be created', inject([DataTransformService], (service: DataTransformService) => {
    expect(service).toBeTruthy();
  }));
});
