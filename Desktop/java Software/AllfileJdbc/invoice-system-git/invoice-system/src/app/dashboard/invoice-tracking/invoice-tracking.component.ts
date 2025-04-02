import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-invoice-tracking',
  templateUrl: './invoice-tracking.component.html',
  styleUrls: ['./invoice-tracking.component.scss'],
  standalone:false
})
export class InvoiceTrackingComponent implements OnInit {
  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    new Chart("invoiceChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Paid Invoices',
            data: [500, 700, 800, 650, 900, 1100, 1300, 1500, 1200, 1400, 1600, 1800],
            borderColor: 'green',
            fill: false,
            tension: 0.4
          },
          {
            label: 'Unpaid Invoices',
            data: [300, 500, 400, 600, 700, 800, 900, 950, 1000, 1100, 1200, 1300],
            borderColor: 'red',
            fill: false,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
