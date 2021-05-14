import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSelectChange } from '@angular/material/select';

import { PlotDataService } from '../plot-data.service';

@Component({
  selector: 'app-data-selector',
  templateUrl: './data-selector.component.html',
  styleUrls: ['./data-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataSelectorComponent implements OnInit {
  constructor(private dataService: PlotDataService) {}

  @ViewChild('root_url') root_url;

  @Output() dataUpdate = new EventEmitter<string[]>();

  ngOnInit() {
    this.updateDataFileList();
    this.data_file_url = this.dataService.url;
  }

  updateDataFileList(): void {
    this.dataService.getFileList().subscribe((list) => (this.data_file_list = list));
  }

  updateUrl(): void {
    this.dataService.url = this.data_file_url;
    this.updateDataFileList();
  }

  emitDataUpdate(dataList: MatSelectChange): void {
    this.dataUpdate.emit(dataList.value);
  }

  data_file_url: string;

  data_file_list: string[];
}
