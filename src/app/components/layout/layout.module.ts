import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import { MobileMenuComponent } from './header/mobile-menu/mobile-menu.component';
import {RouterLink, RouterLinkActive} from "@angular/router";
import { BellComponent } from './header/bell/bell.component';
import { ProfileMenuComponent } from './header/profile-menu/profile-menu.component';
import { ThemeSwitcherComponent } from './header/theme-switcher/theme-switcher.component';
import {ModalModule} from "../modal/modal.module";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    MobileMenuComponent,
    BellComponent,
    ProfileMenuComponent,
    ThemeSwitcherComponent
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
