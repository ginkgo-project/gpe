import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';

import { DataSelectorComponent } from './data-selector.component';

import { DataFile } from '../data-file';
import { PlotDataService } from '../plot-data.service';

const stubPlotData: DataFile[] = [
  { name: 'file1', file: 'file1', content: 'file1' },
  { name: 'file2', file: 'file2', content: 'file2' },
];

class FakePlotDataService {
  getDataFiles() {
    return of(stubPlotData);
  }
}

describe('DataSelectorComponent', () => {
  let component: DataSelectorComponent;
  let fixture: ComponentFixture<DataSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataSelectorComponent],
      providers: [{ provide: PlotDataService, useClass: FakePlotDataService }],
      imports: [FormsModule, MatFormFieldModule, MatIconModule, MatSelectModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataSelectorComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
