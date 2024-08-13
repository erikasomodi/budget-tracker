import { Component } from '@angular/core';
import {
  faShirt,
  faGift,
  faPizzaSlice,
  faMoneyBill,
  faLaptop,
  faChartLine,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionModel } from '../../models/transaction.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrl: './budget-tracker.component.scss',
})
export class BudgetTrackerComponent {
  // expense icons
  faShirt: IconProp = faShirt;
  faGift: IconProp = faGift;
  faPizzaSlice: IconProp = faPizzaSlice;
  // income icons
  faMoneyBill: IconProp = faMoneyBill;
  faLaptop: IconProp = faLaptop;
  faChartLine: IconProp = faChartLine;

  expenses: TransactionModel[] = [
    {
      transactionName: 'Clothes',
      transactionAmount: 24985,
      transactionDate: '2024-08-01',
      transactionCategory: 'Shopping',
      transactionMethod: 'Cash',
      icon: this.faShirt,
    },
    {
      transactionName: 'Book',
      transactionAmount: 4985,
      transactionDate: '2024-08-03',
      transactionCategory: 'Gifts',
      transactionMethod: 'Cash',
      icon: this.faGift,
    },
    {
      transactionName: 'Pizza',
      transactionAmount: 5000,
      transactionDate: '2024-08-05',
      transactionCategory: 'Food',
      transactionMethod: 'Card',
      icon: this.faPizzaSlice,
    },
  ];
  incomes: TransactionModel[] = [
    {
      transactionName: 'Fizu',
      transactionAmount: 450000,
      transactionDate: '2024-08-01',
      transactionCategory: 'Income',
      transactionMethod: 'Bank Transfer',
      icon: this.faMoneyBill,
    },
    {
      transactionName: 'Családi pótlék',
      transactionAmount: 25000,
      transactionDate: '2024-08-03',
      transactionCategory: 'FreeLance',
      transactionMethod: 'Bank Transfer',
      icon: this.faMoneyBill,
    },
    {
      transactionName: 'Tőzsde',
      transactionAmount: 5000,
      transactionDate: '2024-08-10',
      transactionCategory: 'Investments',
      transactionMethod: 'Bank Transfer',
      icon: this.faChartLine,
    },
  ];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  currentView: 'expenses' | 'incomes' = 'expenses';
  switchView(view: 'expenses' | 'incomes') {
    this.currentView = view;
  }
}
