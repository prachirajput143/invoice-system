import { Component } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-analytics-index',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
  standalone: false
})
export class AnalyticsComponent {
  selectedShipmentFilter: string = 'All';
  selectedSalesFilter: string = 'All';
  selectedTimeFilter: string = 'Monthly';

  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  shipmentsData = [
    { data: [200, 180, 220, 250, 230, 260, 280, 270, 260, 250, 230, 240], label: 'On Delivery', backgroundColor: '#4fc16a' },
    { data: [150, 170, 180, 190, 200, 210, 220, 210, 200, 190, 180, 170], label: 'Delivered', backgroundColor: '#84b7ed' },
    { data: [50, 40, 60, 70, 80, 90, 100, 90, 80, 70, 60, 50], label: 'Returned', backgroundColor: '#d75663' }
  ];

  salesData = [
    { data: [320, 400, 380, 450, 500, 470, 520, 540, 560, 580, 600, 620], label: 'Sales', borderColor: '#6a5acd', fill: false },
    { data: [300, 380, 360, 420, 470, 450, 500, 520, 540, 560, 580, 600], label: 'Returns', borderColor: '#d75663', fill: false }
  ];

  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: true,  //  This will prevent stretching
    plugins: {
      legend: { position: 'bottom' }
    },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: '#ddd' }, min: 0, max: 600 } //  Adjust max value if needed
    }
  };  

  chartType: ChartType = 'bar';

  setShipmentFilter(filter: string) {
    this.selectedShipmentFilter = filter;
    console.log(`Shipments filter changed to: ${filter}`);
  }

  setSalesFilter(filter: string) {
    this.selectedSalesFilter = filter;
    console.log(`Sales filter changed to: ${filter}`);
  }

  setTimeFilter(filter: string) {
    this.selectedTimeFilter = filter;
    console.log(`Time filter changed to: ${filter}`);
  }

}
