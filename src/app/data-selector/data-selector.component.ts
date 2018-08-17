import { Component, EventEmitter, Output, OnInit } from '@angular/core';


import { Observable, of } from 'rxjs';


import { PlotDataService } from '../plot-data.service';


@Component({
  selector: 'app-data-selector',
  templateUrl: './data-selector.component.html',
  styleUrls: ['./data-selector.component.css']
})
export class DataSelectorComponent implements OnInit {

  constructor(private dataService : PlotDataService) { }

  @Output() onDataUpdate = new EventEmitter<string[]>();

  ngOnInit() {
    this.updateDataFileList();
    this.data_file_url = this.dataService.url;
  }

  updateDataFileList(): void {
    this.dataService.getFileList()
      .subscribe(list => this.data_file_list = list);
  }

  updateUrl(): void {
    this.dataService.url = this.data_file_url;
    this.updateDataFileList();
  }

  emitDataUpdate(dataList: HTMLSelectElement): void {
    let data: string[] = Array.from(dataList.selectedOptions)
      .map(option => option.value);
    this.onDataUpdate.emit(data);
  }

  error_message: string;
  data_file_url: string;
  data_file_list: string[];
}
