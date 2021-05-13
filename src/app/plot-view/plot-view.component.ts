import { AfterViewInit, Component, Input, ElementRef, ViewChild } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';


import { Chart } from 'chart.js';
import * as jsonata from 'jsonata';
import { saveAs } from 'file-saver';
const C2S = require("canvas2svg-visjs");


import { KeysPipe } from '../keys.pipe';
import { PropertyPipe } from '../property.pipe';
import { DataFile } from '../data-file';
import { PlotDataService } from '../plot-data.service';
import { DEFAULT_RAW_DATA } from '../default-form-values';


// Use more reasonable default options ofr Chart.js
Chart.defaults.animation = false;
Chart.defaults.maintainAspectRatio = false;


// Fix canvas2svg to work with Chart.js
C2S.prototype.getContext = function(contextId) {
  if (contextId=="2d" || contextId=="2D") {
    return this;
  }
  return null;
};

C2S.prototype.style = function() {
  return this.__canvas.style
};

C2S.prototype.getAttribute = function(name) {
  return this[name];
};

C2S.prototype.addEventListener = function(t, l, opt) {};


const EXPORT_HTML_TEMPLATE: string =`<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"> <title>GPE Chart</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.3/Chart.bundle.min.js"></script>
<style>
html, body, canvas { width: 100%; height: 100%; margin: 0; padding: 0; }
html { overflow: hidden; }
.chart-container { position: relative; width: calc(100% - 20px);
  height: calc(100% - 20px); margin: 10px; padding: 0; }
</style></head>
<body><div class="chart-container"><canvas id="chart"></canvas></div></body>
<script>
Chart.defaults.global.animation.duration = 0;
Chart.defaults.global.maintainAspectRatio = false;
window.onload = function() { window.chart = new Chart(
    document.getElementById("chart").getContext("2d"), %%config%%); };
</script>
</html>`;


@Component({
  selector: 'app-plot-view',
  templateUrl: './plot-view.component.html',
  styleUrls: ['./plot-view.component.css']
})
export class PlotViewComponent implements AfterViewInit {
  @ViewChild('chartCanvas') private chartCanvas: ElementRef;

  constructor(private dataService: PlotDataService,
              private jsonPipe: JsonPipe) {
    this.rawDataString = this.jsonPipe.transform(this.rawData);
  }

  ngAfterViewInit(): void {
    this.redrawPlot();
  }

  @Input()
  set data_files(data_files: string[]) {
    if (!data_files || data_files.length == 0) {
      return;
    }
    this.dataService.getDataFiles(data_files)
      .subscribe(rawData => {
        this.rawData = rawData;
        this.rawDataString = this.jsonPipe.transform(this.rawData);
        this.updateData();
      });
  }
  get data_files(): string[] {
    return this.rawData.map(file => file.name);
  }
  rawData: any[] = DEFAULT_RAW_DATA;
  rawDataString: string = "";

  @Input()
  set transformProgram(program: jsonata.Expression) {
    if (program) {
      this.transformProgram_ = program;
    }
    this.updateData();
  }
  get transformProgram(): jsonata.Expression {
    return this.transformProgram_;
  }
  private transformProgram_: jsonata.Expression;

  updateData(): void {
    try {
      this.transformedData = this.transformProgram.evaluate(this.rawData);
    } catch(e) {
      this.transformedData = { "Runtime error" : e };
    }
    this.transformedDataString = this.jsonPipe.transform(this.transformedData);
    this.redrawPlot();
  }

  redrawPlot(): void {
    if (this.plot) {
      this.plot.destroy();
    }
    let copy = this.copyObject(this.transformedData);
    try {
      this.plot = new Chart(this.chartCanvas.nativeElement, copy);
      this.plotError = null;
    } catch (e) {
      this.plotError = e.message;
      if (this.plot) {
        this.plot.destroy();
      }
    }
  }

  savePlotAsHTML(): void {
    let data = new Blob(
      [EXPORT_HTML_TEMPLATE.replace('%%config%%', this.transformedDataString)],
      { type: "text/html;charset=utf-8" });
    saveAs(data, "plot.html");
  }

  savePlotAsPNG(): void {
    let data = this.chartCanvas.nativeElement.toDataURL();
    saveAs(data, "plot.png");
  }

  savePlotAsSVG(): void {
    if (this.plotError) {
      return;
    }
    let data = new Blob(
      [this.convertPlotDataToSvg(this.transformedData)],
      { type: "image/svg+xml" });
    saveAs(data, "plot.svg")
  }

  private copyObject(obj: any): any {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
  }

  private convertPlotDataToSvg(data: any): string {
    data = Object.assign(data, {
      options: { responsive: false, animation: false }
    });
    console.log(data);
    let aspectRatio = data.options.aspectRatio || 2;
    let height = 400;
    let ctx = C2S(aspectRatio * height, height);
    let chart = new Chart(ctx, data);
    return ctx.getSerializedSvg(true);
  }

  editorOptions: any = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true,
    readOnly: true
  };

  transformedData: any = [];
  transformedDataString: string = "";
  plotError: string;

  private plot: any;
}
