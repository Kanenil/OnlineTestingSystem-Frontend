import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination.component';
import {RouterLink} from "@angular/router";



@NgModule({
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class PaginationModule { }
