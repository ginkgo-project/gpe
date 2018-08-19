import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, of, merge } from 'rxjs';
import { tap, map, toArray } from 'rxjs/operators';


import { DataFile} from './data-file';


@Injectable()
export class PlotDataService {

  constructor(private http: HttpClient) { }

  getDataFiles(names: string[]): Observable<DataFile[]> {
    let fetches = this.dataFiles
      .filter(file => names.includes(file.name))
      .map(file => this.http.get<any>(this.url + '/' + file.file)
        .pipe(map(data => { file.content = data; return file; })));
    return merge(...fetches).pipe(toArray());
  }

  getFileList(): Observable<string[]> {
    return this.http.get<DataFile[]>(this.url + '/list.json')
      .pipe(
        tap(response => this.dataFiles = response),
        map(response => response.map(item => item.name))
      );
  }

  url: string =
    'https://raw.githubusercontent.com/ginkgo-project/ginkgo-data/master/data';

  dataFiles: DataFile[];
}
