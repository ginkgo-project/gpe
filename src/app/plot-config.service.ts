import { Injectable } from '@angular/core';


import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';


import { PlotScript } from './plot-script';


// TODO: replace with real data
const SCRIPTS = {
  performance: {
    name: 'performance',
    code: '<<code for performance plot>>'
  },
  bandwidth: {
    name: 'bandwidth',
    code: '<<code for bandwidth plot>>'
  }
};


@Injectable()
export class PlotConfigService {

  constructor() { }

  getPlotScript(script_name: string): Observable<PlotScript> {
    return of(SCRIPTS[script_name]);
  }

  getScriptList(): Observable<string[]> {
    return of(Object.keys(SCRIPTS));
  }

  url: string = 'https://www.example.com';
}
