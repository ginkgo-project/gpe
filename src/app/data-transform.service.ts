import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, of, throwError } from 'rxjs';
import { tap, map, flatMap, retry, catchError } from 'rxjs/operators';


export interface TransformExpression {
  name: string;
  file: string;
  code: string;
};


@Injectable()
export class DataTransformService {

  constructor(private http: HttpClient) { }

  getTransformExpression(url: string, expressionName: string):
      Observable<TransformExpression> {
    return this.getTransformExpressionList(url)
      .pipe(flatMap(expressionList => {
        let expression = expressionList.find(e => e.name == expressionName);
        if (expression === undefined) {
          return throwError(new Error("expression does not exist"));
        }
        if (expression.code) {
          return of(expression);
        }
        return this.http.get(url + '/' + expression.file,
                             {responseType: 'text'})
          .pipe(
            retry(3),
            catchError(this.handleError),
            map(response => { expression.code = response; return expression; })
          );
      }));
  }

  getTransformExpressionNames(url: string): Observable<string[]> {
    return this.getTransformExpressionList(url).pipe(
      map(response => response.map(item => item.name)));
  }

  private getTransformExpressionList(url: string):
      Observable<TransformExpression[]> {
    let rawData: Observable<TransformExpression[]>;
    let databaseEntry = this.expressionDatabase.get(url);
    if (databaseEntry) {
      return of<TransformExpression[]>(databaseEntry);
    }
    return this.http.get<TransformExpression[]>(url + '/list.json').pipe(
        retry(3),
        tap(response => this.expressionDatabase.set(url, response)),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) : Observable<never> {
    return throwError((error.error !== null ? error.error : error) as Error);
  }

  private expressionDatabase = new Map<string, TransformExpression[]>();
}
