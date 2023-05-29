import { Component } from '@angular/core';
import {IExtendedUserModel} from "../../../models/user/extended-user.model";
import {Title} from "@angular/platform-browser";
import {AccountService} from "../../../api/account.service";
import {UserService} from "../../../api/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventBusService} from "../../../shared/event-bus.service";
import {EventNameKeys} from "../../../constants/event-names.constants";
import {LocalStorageKeys} from "../../../constants/local-storage.constants";
import {ModalService} from "../../../services/modal.service";
import {UploadService} from "../../../api/upload.service";
import {IEditProfileModel} from "../../../models/account/edit-profile.model";
import {convertBase64ToFile} from "../../../utils/converters";

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
    private modalService: ModalService,
    private titleService:Title,
    private eventBusService: EventBusService,
    private uploadService: UploadService
  ) {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      this.updateInformation(slug);
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

  private editImage(key: string, image64:string) {
    const file = convertBase64ToFile(image64, 'image.jpg');

    let formData:FormData = new FormData();
    formData.append('file', file)

    this.uploadService.upload(formData).subscribe(resp=>{
      const {fileUrl} = resp;
      const editModel:IEditProfileModel = {
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        image: this.user.image,
        backgroundImage: this.user.backgroundImage,
      }
      this.accountService.edit({
        ...editModel,
        [key]: fileUrl
      }).subscribe(resp=>{
        // @ts-ignore
        this.user[key] = fileUrl;
      })
    })
  }

  changeBackgroundImage(image: any) {
    if(this.user) {
      this.editImage('backgroundImage', image);
    }
  }

  changeLogo(image: any) {
    if(this.user) {
      this.editImage('image', image);
    }
  }

  private updateInformation(slug: string | null) {
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
