import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { IftaLabelModule } from 'primeng/iftalabel';
import { LoginService } from '../service/login.service';
import { MessageModule } from 'primeng/message';
import { Router } from '@angular/router';
import { CommonService } from '../service/common.service';
import { RegisterResponse } from '../model/login-response.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [
    InputTextModule,
    FormsModule,
    IftaLabelModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
    MessageModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailId = null;
  password = null;
  errorMessage: string = null;
  addClass: String;

  constructor(
    private loginService: LoginService,
    private commonService: CommonService,
    private router: Router
  ) {}

  // User registration
  getRegisterScreen() {
    this.router.navigate(['/register']);
  }

  // User after loggedIn
  userLoggedIn() {
    if (this.emailId && this.password) {
      this.loginService
        .userLogin({ identifier: this.emailId, password: this.password })
        .subscribe({
          next: (res: RegisterResponse) => {
            localStorage.setItem('UserId', `${res.id}`);
            this.commonService.loginNavCheck(true);
            console.log(res.id);
            this.router.navigate(['/dashboard', res.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.errorMessage = error.error.message;
          },
        });
    } else {
      this.addClass = 'ng-invalid ng-dirty';
      this.errorMessage = 'Email and Password are required';
    }
  }
}
