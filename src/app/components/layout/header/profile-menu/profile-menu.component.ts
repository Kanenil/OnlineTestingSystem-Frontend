import {Component, EventEmitter, Input, Output} from '@angular/core';
import {IExtendedUserModel} from "../../../../models/user/extended-user.model";

@Component({
  selector: 'header-profile-menu',
  template: `
    <div *ngIf="loginedUser" class="relative group">
      <button type="button"
              class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4a6cf7] dark:bg-gray-700"
      >
        <img *ngIf="loginedUser.image" class="h-8 w-8 rounded-full" src="{{loginedUser.image}}" alt="">
        <div *ngIf="!loginedUser.image"
             class="h-8 w-8 rounded-full bg-blue-600 flex justify-center items-center">
          <span class="font-bold text-white">{{loginedUser.firstName.substring(0, 1) | uppercase}}</span>
        </div>
      </button>
      <div
        class="submenu hidden relative lg:absolute w-[130px] top-full lg:top-[110%] -left-6 rounded-md lg:shadow-lg p-4 lg:block lg:opacity-0 lg:invisible group-hover:opacity-100 lg:group-hover:visible lg:group-hover:top-full bg-white dark:bg-[#1d2144] transition-[top] duration-300">
        <a [routerLink]="['/profile',loginedUser.slug]"
           class="block text-sm rounded py-[10px] px-4 text-dark dark:text-white hover:opacity-70">
          Profile
        </a>
        <a [routerLink]="['/profile','settings']"
           class="block text-sm rounded py-[10px] px-4 text-dark dark:text-white hover:opacity-70">
          Settings
        </a>
        <button (click)="logout.emit()"
                class="block text-sm rounded py-[10px] px-4 text-dark dark:text-white hover:opacity-70">
          Logout
        </button>
      </div>
    </div>
  `
})
export class ProfileMenuComponent {
  @Input() loginedUser : IExtendedUserModel | null = null;
  @Output() logout:EventEmitter<void> = new EventEmitter()
}
