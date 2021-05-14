import { HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

import { PlotDataService } from './plot-data.service';

describe('PlotDataService', () => {
  let service: PlotDataService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlotDataService],
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PlotDataService);
    httpMock = TestBed.get(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
