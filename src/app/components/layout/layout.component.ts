import {Component, HostListener, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme.service";
import {ModalService} from "../../services/modal.service";

@Component({
  selector: 'app-layout',
  template: `
    <div
      class="w-full"
      [ngClass]="{'dark': (themeService.isDarkTheme$ | async)}"
    >



      <app-header></app-header>
      <div class="min-h-screen flex flex-col dark:bg-dark">
        <div class="flex-grow">
          <ng-content></ng-content>
        </div>
        <app-footer></app-footer>



        <button (click)="scrollTop()" id="scroller" class="hidden items-center justify-center bg-[#4a6cf7] text-white w-10 h-10 rounded-md fixed bottom-8 right-8 left-auto z-[49] hover:shadow-signUp hover:bg-opacity-80 transition duration-300 ease-in-out back-to-top shadow-md hidden">
          <span class="w-3 h-3 border-t border-l border-white rotate-45 mt-[6px]"></span>
        </button>

      </div>

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

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20) {
      document.querySelector('#scroller')?.classList.add('flex');
      document.querySelector('#scroller')?.classList.remove('hidden');
    } else {
      document.querySelector('#scroller')?.classList.remove('flex');
      document.querySelector('#scroller')?.classList.add('hidden');
    }
  }

  scrollTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector('#scroller')?.classList.remove('flex');
    document.querySelector('#scroller')?.classList.add('hidden');
  }

}
