import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TableModule } from 'primeng/table';
import { AddExpenseComponent } from '../add-expense/add-expense.component';
import { ExpenseService } from '../../service/expense.service';
import { CommonService } from '../../service/common.service';
import { ProfileComponent } from '../profile/profile.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashbaord',
  imports: [CommonModule, TableModule, AddExpenseComponent, ProfileComponent],
  templateUrl: './dashbaord.component.html',
  styleUrl: './dashbaord.component.scss',
})
export class DashbaordComponent implements OnInit, OnDestroy {
  pieChart: any = null;
  barChart: any = null;
  amounts: Number[] = [];
  categories: String[] = [];
  showChartsAndTable: boolean = false;
  expenseSubscription: Subscription;

  ngOnInit(): void {
    this.getUpdatedData();
    this.expenseSubscription = this.commonService.trigger$.subscribe((res) =>
      this.getUpdatedData()
    );
  }

  constructor(
    private expenseService: ExpenseService,
    private commonService: CommonService
  ) {}

  ngOnDestroy(): void {
    this.expenseSubscription.unsubscribe();
  }

  expenses = [];

  getUpdatedData() {
    this.getExpenses(Number(localStorage.getItem('UserId')));
    this.getCategoryAmounts(Number(localStorage.getItem('UserId')));
  }

  getAmountsAndLabels(): void {
    this.expenses.forEach((expense) => {
      this.amounts.push(expense.amount);
      this.categories.push(expense.category);
    });
  }

  getCategoryAmounts(userId): void {
    this.expenseService.getAmountsByCategory(userId).subscribe((res) => {
      console.log(res);
      this.amounts = Object.values(res);
      this.categories = Object.keys(res);
      if (this.amounts.length === 0 && this.categories.length === 0) {
        this.showChartsAndTable = false;
      } else {
        this.showChartsAndTable = true;
        setTimeout(() => {
          this.createPieChart();
          this.createBarChart();
        }, 0);
      }
    });
  }

  createPieChart() {
    if (this.pieChart) {
      this.pieChart.destroy(); // ✅ Destroy the existing chart instance
    }

    this.pieChart = new Chart('PieChart', {
      type: 'pie', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.categories,
        datasets: [
          {
            label: 'Expenses',
            data: this.amounts,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  createBarChart() {
    if (this.barChart) {
      this.barChart.destroy(); // ✅ Destroy the existing chart instance
    }

    this.barChart = new Chart('BarChart', {
      type: 'bar', //this denotes tha type of chart

      data: {
        // values on X-Axis
        labels: this.categories,
        datasets: [
          {
            label: 'Expenses',
            data: this.amounts,
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  getExpenses(userId: number) {
    this.expenseService.getExpenses(userId).subscribe((res) => {
      console.log(res);
      this.expenses = res;
    });
  }
}
