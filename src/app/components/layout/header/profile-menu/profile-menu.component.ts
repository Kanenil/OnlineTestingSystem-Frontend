import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {IExtendedUserModel} from "../../../../models/user/extended-user.model";

@Component({
  selector: 'header-profile-menu',
  template: `
    <div class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-600 z-10"
         id="profile-menu"
         *ngIf="isOpen && loginedUser">
      <a [routerLink]="['/profile', loginedUser.slug]" (click)="togglePopup()" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"> Profile </a>
      <button (click)="togglePopup(); logout.emit()" class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300"> Logout</button>
    </div>
  `
})
export class ProfileMenuComponent {
  isOpen = false;

  togglePopup() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const element = event.target as HTMLElement;
    const isClickedInsideMenu = element.closest('#profile-menu');
    const isMenuButtonClose = element.closest('#user-menu-button');
    if (!isClickedInsideMenu && this.isOpen && !isMenuButtonClose) {
      this.isOpen = false;
    }
  }


  @Input() loginedUser : IExtendedUserModel | null = null;
  @Output() logout:EventEmitter<void> = new EventEmitter()

}
