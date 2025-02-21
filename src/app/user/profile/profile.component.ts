import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../service/common.service';
import { PasswordModule } from 'primeng/password';
import { Subscription } from 'rxjs';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute } from '@angular/router';
import { RegisterResponse } from '../../model/login-response.model';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    IftaLabel,
    DatePickerModule,
    InputNumberModule,
    FormsModule,
    PasswordModule,
    InputTextModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  showUserProfileModal: boolean;
  loggedInUserData: RegisterResponse;
  email: String;
  username: String;
  profileName: String;
  password: String;
  profileSubscription: Subscription;
  userSubscription: Subscription;
  profileSaveLabel: string = 'Edit';
  disableEmail: boolean = true;
  disableUsername: boolean = true;
  disableProfileName: boolean = true;
  disablePassword: boolean = true;
  constructor(
    private commonService: CommonService,
    private loginService: LoginService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.profileSubscription = this.commonService.profileSettings$.subscribe(
      (res) => {
        this.showUserProfileModal = res;
      }
    );
    this.getUserProfileDetails();
  }

  getUserProfileDetails(): void {
    this.loginService
      .getUserData(Number(localStorage.getItem('UserId')))
      .subscribe((res: RegisterResponse) => {
        this.loggedInUserData = res;
        this.email = res.email;
        this.username = res.username;
        this.profileName = res.profileName;
        this.password = res.password;
      });
  }

  closeDialog() {
    this.commonService.sendMessageProfile(false);
    if (this.profileSaveLabel === 'Save') {
      this.profileSaveLabel = 'Edit';
      this.disableEmail = true;
      this.disableUsername = true;
      this.disableProfileName = true;
      this.disablePassword = true;
    }
  }

  updateUserProfile() {
    if (this.profileSaveLabel === 'Save') {
      let updatedUser = {};
      if (this.loggedInUserData.email !== this.email) {
        updatedUser = { email: this.email, ...updatedUser };
      }
      if (this.loggedInUserData.profileName !== this.profileName) {
        updatedUser = { profileName: this.profileName, ...updatedUser };
      }
      if (this.loggedInUserData.username !== this.username) {
        updatedUser = { username: this.username, ...updatedUser };
      }
      if (this.loggedInUserData.password !== this.password) {
        updatedUser = { password: this.password, ...updatedUser };
      }
      if (Object.keys(updatedUser).length !== 0) {
        this.loginService
          .updateUser(updatedUser, this.route.snapshot.paramMap.get('id'))
          .subscribe({
            next: () => {
              this.getUserProfileDetails();
              this.showUserProfileModal = false;
              this.messageService.add({
                severity: 'success',
                summary: 'Profile Updated',
                detail: 'User data has been sucessfully updated.',
              });
            },
            error: (error: HttpErrorResponse) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Email/username already in use',
                detail: error.error.message,
              });
            },
          });
      } else {
        this.messageService.add({
          severity: 'info',
          summary: 'No updates',
          detail: 'There are no changes in the profile.',
        });
      }
    }
    if (this.profileSaveLabel === 'Edit') {
      this.profileSaveLabel = 'Save';
      this.disableEmail = false;
      this.disableUsername = false;
      this.disableProfileName = false;
      this.disablePassword = false;
    }
  }
}
