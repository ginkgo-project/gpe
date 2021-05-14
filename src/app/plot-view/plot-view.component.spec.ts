import { JsonPipe } from '@angular/common';
import { PipeTransform } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MonacoEditorModule } from '@sentinel-one/ngx-monaco-editor';

import { PlotViewComponent } from './plot-view.component';


import { DataFile } from '../data-file';
import { PlotDataService } from '../plot-data.service';


let stubPlotData: DataFile[] = [
  {name: 'file1', file: 'file1', content: 'file1'},
  {name: 'file2', file: 'file2', content: 'file2'}
];

class FakePlotDataService {
  getDataFiles(){
    return of(stubPlotData)
  }
}


class FakeJsonPipe implements PipeTransform {
  transform(value: any): string[] {
    return Object.keys(value);
  }
}


describe('PlotViewComponent', () => {
  let component: PlotViewComponent;
  let fixture: ComponentFixture<PlotViewComponent>;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ PlotViewComponent ],
      providers: [
        { provide: PlotDataService, useClass: FakePlotDataService },
        { provide: JsonPipe, useClass: FakeJsonPipe }
      ],
      imports: [
	MatButtonModule,
	MatCardModule,
	MatTabsModule,
        MonacoEditorModule.forRoot()
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotViewComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
