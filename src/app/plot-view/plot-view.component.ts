import { Component, Input, OnInit } from '@angular/core';
import { JsonPipe } from '@angular/common';


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

  constructor(
    private configService: PlotConfigService,
    private dataService: PlotDataService
  ) { }

  ngOnInit() {
  }

  @Input()
  set data_files(data_files: string[]) {
    this.dataService.getDataFiles(data_files)
      .subscribe(data => this.data = data);
  }

  get data_files(): string[] {
    return this.data.map(file => file.name);
  }

  @Input()
  set script_name(script_name) {
    this.configService.getPlotScript(script_name)
      .subscribe(script => this.script = script);
  }

  get script_name(): string {
    return this.script.name;
  }

  data: DataFile[];
  script: PlotScript;
}
