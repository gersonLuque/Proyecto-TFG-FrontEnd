import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HeaderComponent } from 'app/shared/components/header/header.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HeaderComponent
  ]
})
export class DashboardModule { }
