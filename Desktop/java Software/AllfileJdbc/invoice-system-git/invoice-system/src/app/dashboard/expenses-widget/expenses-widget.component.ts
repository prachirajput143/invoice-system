import { Component } from '@angular/core';
import { ApexChart, ApexFill, ApexPlotOptions, ApexStroke, ApexTooltip } from 'ng-apexcharts';

@Component({
  selector: 'app-expenses-widget',
  templateUrl: './expenses-widget.component.html',
  styleUrls: ['./expenses-widget.component.scss'],
  standalone:false
})
export class ExpensesWidgetComponent {
  // Radial Chart config
  public series: number[] = [78];

  public chartOptions: any = {
    chart: {
      type: 'radialBar',
      height: 200
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%'
        },
        track: {
          background: '#eee'
        },
        dataLabels: {
          show: true,
          name: {
            show: false
          },
          value: {
            fontSize: '20px',
            show: true
          }
        }
      }
    },
    labels: ['Progress'],
    colors: ['#8B5CF6']
  };

  // Mini stats values
  public totalIncome = '$23,316';
  public totalOutcome = '$23,316';
  public taxableProfit = '$25,316';
}