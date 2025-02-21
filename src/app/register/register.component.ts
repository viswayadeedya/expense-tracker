import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import {
  AbstractControl,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { IftaLabelModule } from 'primeng/iftalabel';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { RegisterResponse } from '../model/login-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [
    InputTextModule,
    FormsModule,
    IftaLabelModule,
    ReactiveFormsModule,
    PasswordModule,
    ButtonModule,
    CommonModule,
    MessageModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  registerForm = this.fb.group(
    {
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(5)]],
      rePassword: [null, [Validators.required]],
      username: [null, [Validators.required]],
      profileName: [null, [Validators.required]],
    },
    {
      validators: this.passwordMatchChecker('password', 'rePassword'), // Apply validator at FormGroup level
    }
  );
  errorMessage: String = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {}

  getLoginScreen() {
    this.router.navigate(['/login']);
  }

  passwordMatchChecker(
    controlName: string,
    matchingControlName: string
  ): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);

      if (!control || !matchingControl) {
        return null;
      }

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return null;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }

      return null;
    };
  }

  registerUser(): void {
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      this.loginService
        .registerUser(this.registerForm.value as RegisterResponse)
        .subscribe({
          next: (res) => {
            console.log(res);
            this.messageService.add({
              severity: 'success',
              summary: 'User Registered',
              detail: 'User has been sucessfully registered. Please Login',
            });
            this.router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error:', err.error);
            this.registerForm.invalid;
            this.errorMessage = err.error.message;
          },
          complete: () => {
            console.log('Registration request completed.');
          },
        });
    }
  }
}
