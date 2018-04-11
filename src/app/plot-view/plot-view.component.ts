import { Component, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { KeysPipe } from '../keys.pipe';


@Component({
  selector: 'app-plot-view',
  templateUrl: './plot-view.component.html',
  styleUrls: ['./plot-view.component.css']
})
export class PlotViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  plot_data = {
    'adaptive_block_jacobi.json' : {
      'double': [2, 3, 4],
      'single': [5, 6, 7],
      'more_dummy_data': [8, 9, 1]
    }
  };

  plot_script = { 'name': 'performance', 'code': 'var i = 10; i = i + 5;' };
}
