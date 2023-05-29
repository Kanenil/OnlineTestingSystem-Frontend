import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ImageCroppedEvent, LoadedImage} from "ngx-image-cropper";

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent {

  isOpen = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';

  width = 0;
  height = 0;

  onSave:any;

  imageCropped(event: any) {
    this.croppedImage = event.base64;
  }

  loadImageFailed() {
    this.closeModal();
  }

  save() {
    this.onSave(this.croppedImage);
    this.closeModal();
  }

  show(event:any, width:number, height: number, onSave:any) {
    if(event.target.files.length > 0) {
      this.imageChangedEvent = event;
      this.isOpen = true;
      this.width = width;
      this.height = height;
      this.onSave = onSave;
      document.querySelector('body')?.classList.add('modal-open');
    }
  }

  closeModal() {
    document.querySelector('body')?.classList.remove('modal-open');
    this.isOpen = false;
  }

}
