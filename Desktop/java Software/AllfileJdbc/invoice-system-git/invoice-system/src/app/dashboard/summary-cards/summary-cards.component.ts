import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary-cards',
  templateUrl: './summary-cards.component.html',
  styleUrls: ['./summary-cards.component.scss'],
  standalone:false
})
export class SummaryCardsComponent implements OnInit {
  cards = [
    {
      title: 'Gross Profit Margin',
      value: 92,
      displayValue: '0%',
      tag: '$3.2K',
      tagClass: 'black',
      iconClass: 'fas fa-dollar-sign',
      iconBg: '#7B61FF',
      isCurrency: false,
      isPercentage: true
    },
    {
      title: 'Outstanding Invoices',
      value: 2450,
      displayValue: '0',
      tag: '2.1K',
      tagClass: 'red',
      iconClass: 'fas fa-file-invoice',
      iconBg: '#7B61FF',
      isCurrency: false,
      isPercentage: false
    },
    {
      title: 'Outstanding Bills',
      value: 1523,
      displayValue: '0',
      tag: '1.5K',
      tagClass: 'black',
      iconClass: 'fas fa-clipboard-list',
      iconBg: '#7B61FF',
      isCurrency: false,
      isPercentage: false
    },
    {
      title: 'Sales Taxes',
      value: 12625,
      displayValue: '$0',
      tag: '$12.2K',
      tagClass: 'black',
      iconClass: 'fas fa-briefcase',
      iconBg: '#7B61FF',
      isCurrency: true,
      isPercentage: false
    }
  ];

  ngOnInit() {
    this.cards.forEach((card, index) => {
      let current = 0;
      const increment = card.value / 60;
      const interval = setInterval(() => {
        current += increment;
        if (current >= card.value) {
          current = card.value;
          clearInterval(interval);
        }
        card.displayValue = card.isCurrency
          ? '$' + Math.floor(current)
          : card.isPercentage
            ? '%' + Math.floor(current)
            : Math.floor(current).toString();
      }, 20);
    });
  }
}
