import { Component, ElementRef, EventEmitter, Output, OnInit, ViewChild }
  from '@angular/core';


import { Observable, of } from 'rxjs';
import * as jsonata from 'jsonata';


import { PlotConfigService } from '../plot-config.service';
import { DEFAULT_TRANSFORM_EXPRESSION } from '../default-form-values';


@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css']
})
export class PlotSelectorComponent implements OnInit {

  constructor(private configService: PlotConfigService) { }

  @Output() onTransformProgramChange =
    new EventEmitter<jsonata.Expression>();

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

  set transformExpression(expression: string) {
    this.transformExpression_ = expression;
    try {
      let transformProgram = jsonata(expression);
      this.onTransformProgramChange.emit(transformProgram);
    } catch (e) {
      console.log(e);
    }
  }

  get transformExpression(): string {
    return this.transformExpression_;
  }

  private transformExpression_: string = DEFAULT_TRANSFORM_EXPRESSION;
  private editorOptions: any = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true
  };
  private plot_file_url: string;
  private plot_file_list: string[];
}
