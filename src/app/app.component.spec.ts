import { TestBed, ComponentFixture, async } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MonacoEditorModule } from '@sentinel-one/ngx-monaco-editor';

import { DataSelectorComponent } from './data-selector/data-selector.component';
import { PlotSelectorComponent } from './plot-selector/plot-selector.component';
import { PlotViewComponent } from './plot-view/plot-view.component';
import { DataTransformService } from './data-transform.service';
import { PlotDataService } from './plot-data.service';
import { KeysPipe } from './keys.pipe';
import { PropertyPipe } from './property.pipe';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DataSelectorComponent,
        PlotSelectorComponent,
        PlotViewComponent,
        KeysPipe,
        PropertyPipe,
      ],
      imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatTabsModule,
        MatToolbarModule,
        MonacoEditorModule.forRoot(),
      ],
      providers: [DataTransformService, PlotDataService, JsonPipe],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Performance Explorer'`, () => {
    const elt = fixture.nativeElement.querySelector('mat-toolbar span span');

    expect(elt.innerHTML.trim()).toEqual('Performance Explorer');
  });

  it('should have a data-selector component', () => {
    const elt = fixture.nativeElement.querySelector('app-data-selector');

    expect(elt).not.toBeNull();
  });
});
