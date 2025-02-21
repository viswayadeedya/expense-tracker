import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { ExpenseRequest } from '../model/expense.model';

@Injectable({
  providedIn: 'root',
})
export class ExpenseService {
  constructor(private httpCLient: HttpClient) {}

  getExpenses(userId: number) {
    return this.httpCLient.get<any>(
      `${environment}/expenses/filterByUser/${userId}`
    );
  }

  addExpense(expenseRequest: ExpenseRequest) {
    return this.httpCLient.post<any>(
      `${environment}/expenses/addExpense`,
      expenseRequest
    );
  }

  getAmountsByCategory(userId) {
    console.log(userId);
    return this.httpCLient.get<any>(
      `${environment}/expenses/totalByCategory/${userId}`
    );
  }
}

// /filterByUser/
