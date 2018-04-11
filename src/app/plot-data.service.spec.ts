import { TestBed, inject } from '@angular/core/testing';

import { PlotDataService } from './plot-data.service';

describe('PlotDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlotDataService]
    });
  });

  it('should be created', inject([PlotDataService], (service: PlotDataService) => {
    expect(service).toBeTruthy();
  }));
});
