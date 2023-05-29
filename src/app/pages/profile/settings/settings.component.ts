import {Component, OnInit} from '@angular/core';
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {AccountService} from "../../../api/account.service";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
  });
  submitted = false;

  // @ts-ignore
  user: IExtendedUserModel
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public accountService: AccountService,
    private eventBusService: EventBusService,
    private notifyService: NotificationService
  ) {
    eventBusService.on(EventNameKeys.Authorize, ()=>{
      router.navigate(['/'],{ replaceUrl: true });
    })
  }

  ngOnInit() {
    this.accountService.profile().subscribe(user => {
      this.user = user;
      this.isLoading = false;
      this.form = this.formBuilder.group(
        {
          firstName: [this.user.firstName, [Validators.required]],
          lastName: [this.user.lastName, [Validators.required]],
        }
      );
    }, error => this.router.navigate(['/'],{replaceUrl: true}))
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    if(this.form.value.firstName !== this.user.firstName ||
       this.form.value.lastName !== this.user.lastName) {
      this.accountService.edit({...this.form.value, image: this.user.image, backgroundImage: this.user.backgroundImage}).subscribe(()=>{
        this.notifyService.showSuccess('Information successfully saved','Settings');
      });
    } else {
      this.notifyService.showWarning('You did not change anything','Settings');
    }



  }

}
