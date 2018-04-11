import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-data-selector',
  templateUrl: './data-selector.component.html',
  styleUrls: ['./data-selector.component.css']
})
export class DataSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  data_location: string = 'https://www.example.com';

  data_file_list: string[] = [
    "block_jacobi.json",
    "adaptive_block_jacobi.json",
    "adaptive_block_jacobi_col_major.json",
    "adaptive_block_jacobi_block_interleaved.json",
    "adaptive_block_jacobi_no_padding.json"
  ];
}
