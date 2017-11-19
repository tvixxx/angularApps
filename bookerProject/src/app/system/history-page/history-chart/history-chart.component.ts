import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  view: any[] = [545, 355];

  @Input() data;

  constructor() {
  }

  ngOnInit() {
  }

}
