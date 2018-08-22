import { Component, ElementRef, EventEmitter, Output, OnInit, ViewChild }
  from '@angular/core';


import { Observable, of } from 'rxjs';
import * as jsonata from 'jsonata';


import { DataTransformService } from '../data-transform.service';
import {
  DEFAULT_TRANSFORM_EXPRESSION,
  DEFAULT_TRANSFORM_SCRIPT_URL
} from '../default-form-values';


class LineInfo {
  line: number;
  startColumn: number;
  endColumn: number;
}


@Component({
  selector: 'app-plot-selector',
  templateUrl: './plot-selector.component.html',
  styleUrls: ['./plot-selector.component.css']
})
export class PlotSelectorComponent implements OnInit {

  constructor(private transformService: DataTransformService) {
  }

  @Output() onTransformProgramChange =
    new EventEmitter<jsonata.Expression>();

  ngOnInit() {
    this.updateTransformExpressionList();
  }

  onMonacoInit(editor: monaco.editor.IStandaloneCodeEditor): void {
    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
      allowComments: false,
      schemas: [],
      validate: false
    });
    this.editor = editor;
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
      monaco.editor.setModelMarkers(this.editor.getModel(), 'jsonata', []);
    } catch (e) {
      let lineInfo = this.getLineInfoOf(e.position, e.token, expression);
      monaco.editor.setModelMarkers(this.editor.getModel(), 'jsonata', [{
        code: e.code,
        startLineNumber: lineInfo.line,
        endLineNumber: lineInfo.line,
        startColumn: lineInfo.startColumn,
        endColumn: lineInfo.endColumn,
        message: e.message,
        severity: monaco.MarkerSeverity.Error
      }]);
    }
  }
  get transformExpression(): string {
    return this.transformExpression_;
  }
  private transformExpression_: string = DEFAULT_TRANSFORM_EXPRESSION;

  private getLineInfoOf(position: number, token: string,
                        code: string): LineInfo {
    let line = 1;
    let lineStart = 0;
    while (true) {
      let nextLineStart = code.indexOf('\n', lineStart + 1);
      if (nextLineStart == -1 || nextLineStart >= position) {
        break;
      }
      lineStart = nextLineStart;
      ++line;
    }
    return {
      line: line,
      startColumn: position - lineStart - token.length,
      endColumn: position - lineStart
    };
  }

  editor: monaco.editor.IStandaloneCodeEditor;

  transformExpressionError: string;

  editorOptions: any = {
    theme: 'vs',
    language: 'json',
    minimap: { enabled: false },
    automaticLayout: true
  };

  transformExpressionUrl = DEFAULT_TRANSFORM_SCRIPT_URL;

  transformExpressionList: string[];
  transformExpressionListError: string;
}
