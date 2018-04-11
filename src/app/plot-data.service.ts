import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { DataFile} from './data-file';


// TODO: replace with real data
const DATA = {
  adaptive_block_jacobi: {
    'name': 'adaptive_block_jacobi',
    'data': {
      'double': [2, 3, 4],
      'single': [5, 6, 7],
      'more_dummy_data': [8, 9, 1]
    }
  },
  adaptive_block_jacobi_col_major: {
    'name': 'adaptive_block_jacobi_col_major',
    'data': {
      'double': [1, 2, 3],
      'single': [5, 6, 7],
      'more_dummy_data': [8, 9, 1]
    }
  }
};


@Injectable()
export class PlotDataService {

  constructor() { }

  getDataFiles(names: string[]): Observable<DataFile[]> {
    return of(names.map(name => DATA[name]));
  }

  getFileList(): Observable<string[]> {
    return of(Object.keys(DATA));
  }

  url: string = 'https://www.example.com';
}
