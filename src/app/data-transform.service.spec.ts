import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { DataTransformService } from './data-transform.service';

describe('DataTransformService', () => {
  let service: DataTransformService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataTransformService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DataTransformService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
