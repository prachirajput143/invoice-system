import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { InvoiceTrackingComponent } from './invoice-tracking/invoice-tracking.component';
import { NgChartsModule } from 'ng2-charts';  
import { AnalyticsComponent } from './analytics-index/analytics.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DashboardComponent,
    AnalyticsComponent,
    InvoiceTrackingComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
