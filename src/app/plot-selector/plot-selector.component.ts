import { Component, ElementRef, EventEmitter, Output, OnInit, ViewChild }
  from '@angular/core';


import { Observable, of } from 'rxjs';
import * as jsonata from 'jsonata';


import { DataTransformService } from '../data-transform.service';
import {
  DEFAULT_TRANSFORM_EXPRESSION,
  DEFAULT_TRANSFORM_SCRIPT_URL
} from '../default-form-values';


@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css']
})
export class PlotSelectorComponent implements OnInit {

  constructor(private transformService: DataTransformService) { }

  @Output() onTransformProgramChange =
    new EventEmitter<jsonata.Expression>();

  ngOnInit() {
    this.updateTransformExpressionList();
  }

  updateTransformExpressionList(): void {
    this.transformService.getTransformExpressionNames(
      this.transformExpressionUrl)
    .subscribe(
      list => {
        this.transformExpressionListError = null;
        this.transformExpressionList = list;
      },
      error => {
        this.transformExpressionListError = error.message;
      }
    );
  }

  loadTransformExpression(scriptName: string) {
    this.transformService.getTransformExpression(
      this.transformExpressionUrl,
      scriptName).subscribe(
        expression => {
          this.transformExpressionError = null;
          this.transformExpression = expression.code;
        },
        error => {
          this.transformExpressionError = error.message;
        }
      );
  }

  set transformExpression(expression: string) {
    this.transformExpression_ = expression;
    try {
      let transformProgram = jsonata(expression);
      this.onTransformProgramChange.emit(transformProgram);
    } catch (e) {
      console.log("TODO: report error in editor");
      console.log(e);
    }
  }
  get transformExpression(): string {
    return this.transformExpression_;
  }
  private transformExpression_: string = DEFAULT_TRANSFORM_EXPRESSION;

  transformExpressionError: string;

  editorOptions: any = {
    theme: 'vs',
    language: 'json',
    automaticLayout: true
  };

  transformExpressionUrl = DEFAULT_TRANSFORM_SCRIPT_URL;

  transformExpressionList: string[];
  transformExpressionListError: string;
}
