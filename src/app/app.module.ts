import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
} from '@angular/material';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';


import { AppComponent } from './app.component';
import { DataSelectorComponent } from './data-selector/data-selector.component';
import { PlotSelectorComponent } from './plot-selector/plot-selector.component';
import { PlotViewComponent } from './plot-view/plot-view.component';
import { PlotConfigService } from './plot-config.service';
import { PlotDataService } from './plot-data.service'
import { KeysPipe } from './keys.pipe';
import { PropertyPipe } from './property.pipe';


@NgModule({
  declarations: [
    AppComponent,
    DataSelectorComponent,
    PlotSelectorComponent,
    PlotViewComponent,
    KeysPipe,
    PropertyPipe
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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule
  ],
  providers: [
    PlotConfigService,
    PlotDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
