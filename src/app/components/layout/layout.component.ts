import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-layout',
  template: `
    <div class="flex flex-col h-screen"
         [ngClass]="{'dark': (themeService.isDarkTheme$ | async), 'overflow-y-hidden':modalService.isVisible$ | async}"
    >
      <app-header></app-header>
      <div class="flex-grow dark:bg-gray-800">
        <div class="max-w-7xl mx-auto">
          <ng-content></ng-content>
        </div>
      </div>
      <app-footer></app-footer>

      <app-modal *ngIf="modalService.isVisible$ | async">
        <ng-container *ngComponentOutlet="modalService.selectedComponent$ | async"></ng-container>
      </app-modal>
    </div>
  `
})
export class LayoutComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.themeService.initTheme()
  }

}
