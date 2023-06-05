import {Component, Input} from '@angular/core';

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent {
  @Input() items: Array<{name: string, link: Array<string>}> = [];
}
