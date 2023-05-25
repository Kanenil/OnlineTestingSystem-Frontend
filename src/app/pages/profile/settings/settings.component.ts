import { Component } from '@angular/core';
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../api/account.service";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent {

  // @ts-ignore
  user: IExtendedUserModel
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public accountService: AccountService,
    private eventBusService: EventBusService
  ) {
    this.accountService.profile().subscribe(user => {
      this.user = user;
      this.isLoading = false;
    }, error => router.navigate(['/'],{replaceUrl: true}))
    eventBusService.on(EventNameKeys.Authorize, ()=>{
      router.navigate(['/'],{ replaceUrl: true });
    })
  }

}
