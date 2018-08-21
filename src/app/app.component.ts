import { Component } from '@angular/core';


import * as jsonata from 'jsonata';


import {
  DEFAULT_TRANSFORM_EXPRESSION
} from './default-form-values';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plot_data: string[];
  transformProgram: jsonata.Expression = jsonata(DEFAULT_TRANSFORM_EXPRESSION);
}
