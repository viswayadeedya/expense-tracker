import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { IftaLabel } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DatePickerModule } from 'primeng/datepicker';
import { CommonService } from '../../service/common.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ExpenseService } from '../../service/expense.service';

@Component({
  selector: 'app-add-expense',
  imports: [
    DialogModule,
    CommonModule,
    ButtonModule,
    IftaLabel,
    DatePickerModule,
    InputNumberModule,
    FormsModule,
    InputTextModule,
  ],
  standalone: true,
  templateUrl: './add-expense.component.html',
  styleUrl: './add-expense.component.scss',
})
export class AddExpenseComponent implements OnInit {
  subscription: Subscription;
  showAddExpenseModal: boolean;
  category: string;
  description: string;
  amount: number;
  date: Date;

  constructor(
    private commonService: CommonService,
    private expenseService: ExpenseService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscription = this.commonService.addExpense$.subscribe((res) => {
      this.showAddExpenseModal = res;
      console.log(res);
    });
  }

  closeDialog(): void {
    this.commonService.sendMessageAddExpense(false);
  }

  toCapitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  saveExpense() {
    this.expenseService
      .addExpense({
        userId: Number(localStorage.getItem('UserId')),
        date: this.date,
        category: this.toCapitalize(this.category),
        amount: this.amount,
        description: this.toCapitalize(this.description),
      })
      .subscribe((res) => {
        console.log(res);
        this.commonService.eventTrigger();
        this.messageService.add({
          severity: 'success',
          summary: 'Expense Added',
          detail: 'Expense has been succesfully added.',
        });
      });
    this.commonService.sendMessageAddExpense(false);
  }
}
