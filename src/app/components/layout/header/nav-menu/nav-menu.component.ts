import {Component, Input} from '@angular/core';
import {IExtendedUserModel} from "../../../../models/user/extended-user.model";

@Component({
  selector: 'header-nav-menu',
  templateUrl: './nav-menu.component.html'
})
export class NavMenuComponent {
  @Input() loginedUser: IExtendedUserModel | null = null;

  isOpen = false;

  toggleMenu() {
    if(!this.isOpen) {
      document.querySelector('#navbarCollapse')?.classList.remove('hidden')
      document.querySelector('#navbarToggler')?.classList.add("navbarTogglerActive")
    }
    else {
      document.querySelector('#navbarCollapse')?.classList.add('hidden')
      document.querySelector('#navbarToggler')?.classList.remove("navbarTogglerActive")
    }

    this.isOpen = !this.isOpen;
  }

}
