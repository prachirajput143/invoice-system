import { Component } from '@angular/core';
import {
  ApexAxisChartSeries, ApexChart, ApexXAxis, ApexStroke, ApexFill
} from 'ng-apexcharts';

@Component({
  selector: 'app-cash-flow',
  templateUrl: './cash-flow.component.html',
  styleUrls: ['./cash-flow.component.scss'],
  standalone:false
})
export class CashFlowComponent {
  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Income',
      data: [45, 80, 65, 60, 0, 30, 50, 60, 40]
    },
    {
      name: 'Outcome',
      data: [40, 30, 15, 10, 0, 80, 70, 90, 50]
    }
  ];

  chart: ApexChart = {
    type: 'area',
    height: 300,
    toolbar: { show: false }
  };

  xaxis: ApexXAxis = {
    categories: ['18 july', '19 july', '20 july', '21 july', '22 july', '23 july', '24 july', '25 july', '26 july']
  };

  colors = ['#6C63FF', '#FFA500'];

  stroke: ApexStroke = {
    curve: 'smooth',
    width: 2
  };

  fill: ApexFill = {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.3,
      opacityTo: 0.05,
      stops: [0, 90, 100]
    }
  };
}
