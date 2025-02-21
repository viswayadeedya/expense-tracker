import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse, RegisterResponse } from '../model/login-response.model';
import { environment } from '../../environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  userLogin(loginResponse: LoginResponse) {
    return this.httpClient.post<any>(
      `${environment}/users/login`,
      loginResponse
    );
  }

  registerUser(registerResponse: RegisterResponse) {
    return this.httpClient.post<any>(
      `${environment}/users/register`,
      registerResponse
    );
  }
  getUserData(id: number) {
    return this.httpClient.get<any>(`${environment}/users/user/${id}`);
  }

  updateUser(user, id) {
    return this.httpClient.patch<any>(
      `${environment}/users/update/${id}`,
      user
    );
  }
}
