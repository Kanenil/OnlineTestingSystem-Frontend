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
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child: ActivatedRoute | null = this.route.firstChild;
          let title = child && child.snapshot.data['title'];
          if (title) {
            return title;
          }
        })
      )
      .subscribe((title) => {
        if (title) {
          this.titleService.setTitle(`Smart Test - ${title}`);
        }
      });
  }

}
