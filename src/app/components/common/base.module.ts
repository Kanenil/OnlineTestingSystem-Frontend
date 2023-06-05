import { NgModule } from '@angular/core';
import {CommonModule, NgForOf} from '@angular/common';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    BreadcrumbsComponent
  ],
  exports: [
    BreadcrumbsComponent
  ],
  imports: [
    CommonModule,
    RouterLink,
    NgForOf
  ]
})
export class BaseModule { }
