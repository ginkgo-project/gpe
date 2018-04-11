import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css']
})
export class PlotSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  plot_data_location: string = 'https://www.example.com';

  plot_file_list: string[] = [
    'problem_size_vs_performance.js',
    'block_size_vs_performance.js'
  ];
}
