import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import { ProfileMenuComponent } from './header/profile-menu/profile-menu.component';
import { ThemeSwitcherComponent } from './header/theme-switcher/theme-switcher.component';
import {ModalModule} from "../modal/modal.module";
import { NavMenuComponent } from './header/nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    ProfileMenuComponent,
    ThemeSwitcherComponent,
    NavMenuComponent,
  ],
    imports: [
        CommonModule,
        RouterLinkActive,
        RouterLink,
        ModalModule
    ],
  exports: [
    LayoutComponent,
  ]
})
export class LayoutModule { }
