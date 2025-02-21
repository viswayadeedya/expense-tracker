import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { RegisterResponse } from '../model/login-response.model';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private addExpenseSource = new BehaviorSubject<boolean>(false); // Create a Subject
  addExpense$ = this.addExpenseSource.asObservable(); // Expose it as an Observable

  private profileSource = new BehaviorSubject<boolean>(false); // Create a Subject
  profileSettings$ = this.profileSource.asObservable(); // Expose it as an Observable

  private loginNavSource = new BehaviorSubject<boolean>(false); // Create a Subject
  loginNav$ = this.loginNavSource.asObservable(); // Expose it as an Observable

  private triggerSource = new Subject<boolean>();
  trigger$ = this.triggerSource.asObservable();

  constructor() {}

  sendMessageAddExpense(message: boolean) {
    this.addExpenseSource.next(message);
  }

  loginNavCheck(user: boolean) {
    this.loginNavSource.next(user);
  }

  eventTrigger() {
    this.triggerSource.next(true);
  }

  sendMessageProfile(message: boolean) {
    this.profileSource.next(message);
  }
}
