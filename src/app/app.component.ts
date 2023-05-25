import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  template: `
    <app-layout>
      <router-outlet></router-outlet>
    </app-layout>
  `
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.route.firstChild;
        while (child) {
          if (child.firstChild) {
            child = child.firstChild;
          } else if (child.snapshot.data && child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          } else {
            return null;
          }
        }
        return null;
      })
    ).subscribe( (data: any) => {
      if (data) {
        this.titleService.setTitle(data + ' - Smart Test');
      }
    });
  }

}
