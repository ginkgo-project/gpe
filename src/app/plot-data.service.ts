import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map } from 'rxjs/operators';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/toArray';


import { DataFile} from './data-file';


@Injectable()
export class PlotDataService {

  constructor(private http: HttpClient) { }

  getDataFiles(names: string[]): Observable<DataFile[]> {
    let fetches = this.dataFiles
      .filter(file => names.includes(file.name))
      .map(file => this.http.get<any>(this.url + '/' + file.file)
        .pipe(map(data => { file.content = data; return file; })));
    return Observable.merge(...fetches).toArray();
  }

  getFileList(): Observable<string[]> {
    return this.http.get<DataFile[]>(this.url + '/list.json')
      .pipe(
        tap(response => this.dataFiles = response),
        map(response => response.map(item => item.name))
      );
  }

  url: string =
    'https://raw.githubusercontent.com/gflegar/ginkgo-data/master/data';

  dataFiles: DataFile[];
}
