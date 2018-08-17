import { Component, EventEmitter, Output, OnInit } from '@angular/core';


import { Observable, of } from 'rxjs';


import { PlotConfigService } from '../plot-config.service';


@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css']
})
export class PlotSelectorComponent implements OnInit {

  constructor(private configService: PlotConfigService) { }

  @Output() onPlotUpdate = new EventEmitter<string>();

  ngOnInit() {
    this.updatePlotFileList();
    this.plot_file_url = this.configService.url;
  }

  updatePlotFileList(): void {
    this.configService.getScriptList()
      .subscribe(list => this.plot_file_list = list);
  }

  updateUrl(): void {
    this.configService.url = this.plot_file_url;
    this.updatePlotFileList();
  }

  emitPlotUpdate(selectedScript: HTMLSelectElement): void {
    let options = selectedScript.selectedOptions;
    if (options.length && options.item(0).value) {
      this.onPlotUpdate.emit(options.item(0).value);
    }
  }

  error_message: string;
  plot_file_url: string;
  plot_file_list: string[];
}
