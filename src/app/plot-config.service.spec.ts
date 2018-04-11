import { TestBed, inject } from '@angular/core/testing';

import { PlotConfigService } from './plot-config.service';

describe('PlotConfigService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlotConfigService]
    });
  });

  it('should be created', inject([PlotConfigService], (service: PlotConfigService) => {
    expect(service).toBeTruthy();
  }));
});
