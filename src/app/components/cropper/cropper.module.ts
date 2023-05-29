import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CropperComponent } from './cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CropperComponent
  ],
  exports: [
    CropperComponent
  ],
  imports: [
    CommonModule,
    ImageCropperModule,
    ReactiveFormsModule
  ]
})
export class CropperModule { }
