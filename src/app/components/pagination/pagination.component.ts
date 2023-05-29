import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent {

  // @ts-ignore
  @Input() currentPage: number;
  // @ts-ignore
  @Input() countOnPage: number;
  // @ts-ignore
  @Input() pages: number;
  @Output() onPageChanged = new EventEmitter();

  pageChanged(newPage:number) {
    if(this.currentPage !== newPage)
      this.onPageChanged.emit(newPage);
  }

  paginationArray(pages:number) {
    var x = [];
    for (var i = 0; i < pages; ++i) {
      x[i] = i + 1;
    }
    return x;
  }

}
