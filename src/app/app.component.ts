import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

import * as jsonata from 'jsonata';

import { DEFAULT_TRANSFORM_EXPRESSION } from './default-form-values';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      'github',
      sanitizer.bypassSecurityTrustResourceUrl('assets/icons/github.svg'),
    );
  }

  plot_data: string[];

  transformProgram: jsonata.Expression = jsonata(DEFAULT_TRANSFORM_EXPRESSION);
}
