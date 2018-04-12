import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';


import { Chart } from 'chart.js';


import { KeysPipe } from '../keys.pipe';
import { PropertyPipe } from '../property.pipe';
import { PlotScript } from '../plot-script';
import { DataFile } from '../data-file';
import { PlotConfigService } from '../plot-config.service';
import { PlotDataService } from '../plot-data.service'


@Component({
  selector: 'app-plot-view',
  templateUrl: './plot-view.component.html',
  styleUrls: ['./plot-view.component.css']
})
export class PlotViewComponent implements OnInit {
  @ViewChild('chartCanvas') chartCanvas;

  constructor(
    private configService: PlotConfigService,
    private dataService: PlotDataService
  ) { }

  ngOnInit() {
  }

  @Input()
  set data_files(data_files: string[]) {
    this.dataService.getDataFiles(data_files)
      .subscribe(data => {
        this.data = data;
        this.updatePlot();
      });
  }

  get data_files(): string[] {
    return this.data.map(file => file.name);
  }

  @Input()
  set script_name(script_name) {
    this.configService.getPlotScript(script_name)
      .subscribe(script => {
        this.script = script;
        this.updatePlot();
      });
  }

  get script_name(): string {
    return this.script.name;
  }

  updatePlot(): void {
    let generator: any = (new Function(this.script.code))();
    this.plotData = generator.generate_plot_data(this.data);
    this.redrawPlot();
  }

  redrawPlot(): void {
    if (this.plot) {
      this.plot.destroy();
    }
    let ctx = this.chartCanvas.nativeElement.getContext("2d");
    let copy = JSON.parse(JSON.stringify(this.plotData));
    this.plot = new Chart(ctx, copy);
  }

  data: DataFile[] = [];
  script: PlotScript = new PlotScript();
  plotData: any;
  plot: Chart;
  verbose: boolean = false;
}
