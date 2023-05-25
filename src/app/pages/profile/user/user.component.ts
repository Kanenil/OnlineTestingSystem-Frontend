import { Component } from '@angular/core';
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {Title} from "@angular/platform-browser";
import {AccountService} from "../../../api/account.service";
import {UserService} from "../../../api/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent {
  // @ts-ignore
  user: IExtendedUserModel;
  loginedUser: IExtendedUserModel | null = null;
  backgroundImage: string = "/assets/default-backgrounds/default-background-1.jpg";
  isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UserService,
    public accountService: AccountService,
    private titleService:Title,
    private eventBusService: EventBusService
  ) {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.updateInforamtion(slug);
    });
    eventBusService.on(EventNameKeys.Authorize, ()=>{
      this.loadUser();
    })
  }

  private loadUser() {
    if(localStorage.getItem(LocalStorageKeys.Tokens))
      this.accountService.profile().subscribe(user=>{
        this.loginedUser = user;
      })
    else
      this.loginedUser = null;
  }

  private updateInforamtion(slug: string | null) {
    this.loadUser();

    let ran = Math.round((Math.random() * 100) % 2) + 1;
    this.backgroundImage = `/assets/default-backgrounds/default-background-${ran}.jpg`;

    if (slug) {
      this.isLoading = true;
      this.usersService.getBySlug(slug).subscribe(user => {
        this.user = user;
        this.isLoading = false;
        this.titleService.setTitle(`${this.user.firstName} ${this.user.lastName} - Smart Test`)
      })
    } else {
      this.router.navigate(['/not-found']);
    }
  }

}
