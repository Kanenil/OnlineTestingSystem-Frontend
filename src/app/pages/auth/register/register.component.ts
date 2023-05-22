import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../api/auth.service";
import {EventBusService} from "../../../shared/event-bus.service";
import {Router} from "@angular/router";
import Validation from "../../../utils/validation";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {EventData} from "../../../shared/event.class";
import {EventNameKeys} from "../../../constants/event-names.constants";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private eventBusService: EventBusService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
          ]
        ],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
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

    this.authService.register(this.form.value).subscribe(
      resp => {
        localStorage.setItem(LocalStorageKeys.Tokens, JSON.stringify(resp.tokens));
        this.eventBusService.emit(new EventData(EventNameKeys.Authorize, resp.tokens));
        this.router.navigate(['/'],{ replaceUrl: true });
      }, error => {
        if(error.error.ErrorMessage.includes('already exists')){
          this.f["email"].setErrors({'exists':true})
        }
      }
    );


  }

}
