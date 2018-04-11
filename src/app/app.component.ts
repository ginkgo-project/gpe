import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  plot_type: string = "performance plot";
  plot_data: string[] = ["block_jacobi", "adaptive_block_jacobi"];
}
