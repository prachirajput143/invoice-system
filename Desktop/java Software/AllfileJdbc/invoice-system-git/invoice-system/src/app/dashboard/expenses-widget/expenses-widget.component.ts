import { Component } from '@angular/core';
import { ApexChart, ApexFill, ApexPlotOptions, ApexStroke, ApexTooltip } from 'ng-apexcharts';

@Component({
  selector: 'app-expenses-widget',
  templateUrl: './expenses-widget.component.html',
  styleUrls: ['./expenses-widget.component.scss'],
  standalone:false
})
export class ExpensesWidgetComponent {
  value = 23316;
  taxableProfit = 12625;
  miniStats = [
    { title: 'Total Income', value: 23316, trend: '+2.3%', color: '#F6A600', series: [10, 20, 15, 25, 20] },
    { title: 'Total Outcome', value: 23316, trend: '-1.1%', color: '#00C1D4', series: [20, 15, 10, 15, 20] },
    { title: 'Taxable Profit', value: 25316, trend: '+3.2%', color: '#7B61FF', series: [10, 12, 15, 18, 20] },
  ];

  gaugeChart = {
    series: [78], // % of value
    chart: {
      type: 'radialBar',
      height: 250,
    } as ApexChart,
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: '60%',
        },
        track: {
          background: '#EDEDED',
        },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '22px',
            offsetY: 10,
          },
        },
      }
    } as ApexPlotOptions,
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: ['#7B61FF'],
        stops: [0, 100]
      }
    } as ApexFill,
    stroke: {
      lineCap: 'round'
    } as ApexStroke,
    labels: ['All Total']
  };
}
