import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IExtendedUserModel} from "../../../../models/user/extended-user.model";

@Component({
  selector: 'header-mobile-menu',
  templateUrl: './mobile-menu.component.html'
})
export class MobileMenuComponent {
  isOpen = false;

  togglePopup() {
    this.isOpen = !this.isOpen;
  }

  // @ts-ignore
  @Input() loginedUser: IExtendedUserModel | null;
  @Output() logout:EventEmitter<void> = new EventEmitter()
}
