import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestItemComponent } from './test-item/test-item.component';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    TestItemComponent
  ],
  exports: [
    TestItemComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ]
})
export class TestModule { }
