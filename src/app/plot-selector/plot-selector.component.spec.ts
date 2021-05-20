import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MonacoEditorModule } from '@sentinel-one/ngx-monaco-editor';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { DataTransformService } from '../data-transform.service';

import { PlotSelectorComponent } from './plot-selector.component';

interface TransformExpression {
  name: string;
  file: string;
  code: string;
}

const stubTransformExpression: TransformExpression = {
  name: 'test',
  file: 'test.txt',
  code: '123',
};

const stubExpressionNames: string[] = ['string1', 'string2'];

class FakeDataTransformService {
  getTransformExpression(): Observable<TransformExpression> {
    return of(stubTransformExpression);
  }

  getTransformExpressionNames(): Observable<string[]> {
    return of(stubExpressionNames);
  }
}

describe('PlotSelectorComponent', () => {
  let component: PlotSelectorComponent;
  let fixture: ComponentFixture<PlotSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlotSelectorComponent],
      imports: [
        FormsModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MonacoEditorModule.forRoot(),
        NoopAnimationsModule,
      ],
      providers: [{ provide: DataTransformService, useClass: FakeDataTransformService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
