import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CourseService} from "../../../api/course.service";
import {ModalService} from "../../../services/modal.service";
import {NotificationService} from "../../../services/notification.service";

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html'
})
export class CreateCourseComponent implements OnInit  {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    section: new FormControl(''),
    isOnlyForCodeAccess: new FormControl(false),
  });
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    public modalService: ModalService,
    public notifyService: NotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
        section: [''],
        isOnlyForCodeAccess: [
          false
        ]
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

    this.courseService.create(this.form.value).subscribe(
      resp => {
        this.courseService.getById(resp?.id).subscribe(course=>{
          this.notifyService.showSuccess("Course successfully created","Course info");
          this.modalService.close();
          this.router.navigate(['/courses', course.slug]);
        })
      }
    );
  }

}
