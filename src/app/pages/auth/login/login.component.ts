import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../api/auth.service";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventData} from "../../../shared/event.class";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {Router} from "@angular/router";
import {SocialAuthService} from "@abacritt/angularx-social-login";
import {IAuthResponseModel} from "../../../models/auth/auth-response.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router,
    private socialService: SocialAuthService
  ) { }

  ngOnInit() {
    this.socialService.authState.subscribe((user)=>{
      if(user) {
        this.authService.googleLogin({googleToken: user.idToken}).subscribe((resp)=>{
          this.saveAndRedirectToHome(resp);
          this.socialService.signOut();
        }, error=>{
          if(error.error.ErrorMessage === 'GoogleLogin: User not found.') {
            this.router.navigate(['/auth','google-finish'],{
              queryParams: {
                token:user.idToken,
                firstName:user.firstName,
                lastName:user.lastName,
                image:user.photoUrl,
              }
            })
            this.socialService.signOut();
          }
        })
      }
    })
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
          ]
        ],
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.value).subscribe(resp=>{
      this.saveAndRedirectToHome(resp);
    })

  }

  private saveAndRedirectToHome(resp: IAuthResponseModel) {
    localStorage.setItem(LocalStorageKeys.Tokens, JSON.stringify(resp.tokens));
    this.eventBusService.emit(new EventData(EventNameKeys.Authorize,resp.tokens));
    this.router.navigate(['/'],{ replaceUrl: true });
  }

}
