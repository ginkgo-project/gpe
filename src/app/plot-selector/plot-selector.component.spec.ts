import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlotSelectorComponent } from './plot-selector.component';

describe('PlotSelectorComponent', () => {
  let component: PlotSelectorComponent;
  let fixture: ComponentFixture<PlotSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlotSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlotSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
