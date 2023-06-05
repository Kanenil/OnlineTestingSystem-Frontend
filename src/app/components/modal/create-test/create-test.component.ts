import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CourseService} from "../../../api/course.service";
import {ModalService} from "../../../services/modal.service";
import {NotificationService} from "../../../services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ICourseDetailsModel} from "../../../models/course/course-details.model";
import {TestService} from "../../../api/test.service";

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html'
})
export class CreateTestComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });
  submitted = false;

  // @ts-ignore
  course: ICourseDetailsModel;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private testService: TestService,
    public modalService: ModalService,
    public notifyService: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    const currentUrl = this.router.url;

    const regex = /\/courses\/([^\/]+)/; // Replace "your-route" with the actual route that contains the :slug parameter
    const match = currentUrl.match(regex);
    const slug = match && match[1];

    this.courseService.getBySlug(slug || '').subscribe(resp=>{
        this.course = resp;
      }, error => {this.router.navigate(['/not-found'],{replaceUrl: true})}
    )
    this.form = this.formBuilder.group(
      {
        name: ['', [Validators.required]],
        description: [''],
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

    this.testService.create({...this.form.value, courseId: this.course.id}).subscribe(resp=>{
      this.notifyService.showSuccess("Test successfully created","Test info");
      this.modalService.close();
      this.router.navigate(['/courses', this.course.slug, 'tests', resp.id]);
    })
  }

}
