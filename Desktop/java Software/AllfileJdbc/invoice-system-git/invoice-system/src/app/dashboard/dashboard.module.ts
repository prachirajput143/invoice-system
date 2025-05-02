import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InvoiceTrackingComponent } from './invoice-tracking/invoice-tracking.component';
import { NgChartsModule } from 'ng2-charts';  
import { AnalyticsComponent } from './analytics-index/analytics.component';
import { HttpClientModule } from '@angular/common/http';
import { SummaryCardsComponent } from './summary-cards/summary-cards.component';
import { CashFlowComponent } from './cash-flow/cash-flow.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { ExpensesWidgetComponent } from './expenses-widget/expenses-widget.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    InvoiceTrackingComponent,
    SummaryCardsComponent,
    CashFlowComponent,
    ExpensesWidgetComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    HttpClientModule,
    NgApexchartsModule
   
  ]
})
export class DashboardModule { }
