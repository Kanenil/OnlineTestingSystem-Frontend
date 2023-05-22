import {Component, OnInit} from '@angular/core';
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {ThemeService} from "../../../services/theme.service";
import {EventBusService} from "../../../shared/event-bus.service";
import {JwtService} from "../../../services/jwt.service";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {EventData} from "../../../shared/event.class";
import {AccountService} from "../../../api/account.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(
    public themeService: ThemeService,
    private eventBusService: EventBusService,
    private jwtService: JwtService,
    private accountService: AccountService
  ) {}

  loginedUser: IExtendedUserModel | null = null;

  ngOnInit() {
    this.loadUser();

    this.eventBusService.on(EventNameKeys.Authorize, (tokens:any) => {
      this.loadUser();
    });
  }

  private loadUser() {
    if(localStorage.getItem(LocalStorageKeys.Tokens))
      this.accountService.profile().subscribe(user=>{
        this.loginedUser = user;
      })
    else
      this.loginedUser = null;
  }


  logout() {
    this.accountService.logout().subscribe(()=>{
      localStorage.removeItem(LocalStorageKeys.Tokens);
      this.eventBusService.emit(new EventData(EventNameKeys.Authorize, null));
    })
  }

}
