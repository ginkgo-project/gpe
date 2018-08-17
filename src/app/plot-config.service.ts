import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';


import { PlotScript } from './plot-script';


@Injectable()
export class PlotConfigService {

  constructor(private http: HttpClient) { }

  getPlotScript(script_name: string): Observable<PlotScript> {
    let script: PlotScript =
      this.scripts.find(script => script.name == script_name);
    return this.http.get(this.url + '/' + script.file, {responseType: 'text'})
      .pipe(map(code => { script.code = code; return script; }));
  }

  getScriptList(): Observable<string[]> {
    return this.http.get<PlotScript[]>(this.url + '/list.json')
      .pipe(
        tap(response => this.scripts = response),
        map(response => response.map(item => item.name))
      );
  }

  url: string =
    'https://raw.githubusercontent.com/gflegar/ginkgo-data/master/plots';

  scripts: PlotScript[];
}
