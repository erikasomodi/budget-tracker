import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTrackerComponent implements OnInit {
  // expense icons
  faShirt: IconProp = faShirt;
  faGift: IconProp = faGift;
  faPizzaSlice: IconProp = faPizzaSlice;
  // income icons
  faMoneyBill: IconProp = faMoneyBill;
  faLaptop: IconProp = faLaptop;
  faChartLine: IconProp = faChartLine;

  currentSum: number = 0;

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

  // transactions: TransactionModel[] = [...this.expenses, ...this.incomes];
  transactions: TransactionModel[] = [
    ...this.expenses.map((transaction) => ({
      ...transaction,
      transactionAmount: -Math.abs(transaction.transactionAmount), // Negatív lesz
    })),
    ...this.incomes,
  ];

  transactionsSum: number = this.transactions.reduce(
    (sum, transaction) => sum + transaction.transactionAmount,
    0
  );

  currentView: 'expenses' | 'incomes' | 'transactions' = 'expenses';

  switchView(view: 'expenses' | 'incomes' | 'transactions') {
    this.currentView = view;
    this.currentSum = this.calculateSum(view);
  }

  calculateSum(view: 'expenses' | 'incomes' | 'transactions'): number {
    let transactions;
    if (view === 'expenses') {
      transactions = this.expenses;
    } else if (view === 'incomes') {
      transactions = this.incomes;
    } else {
      transactions = this.transactions;
    }

    return transactions.reduce(
      (sum, transaction) => sum + transaction.transactionAmount,
      0
    );
  }

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

  ngOnInit() {
    // Negatív lesz az összeg
    this.expenses = this.expenses.map((transaction) => ({
      ...transaction,
      transactionAmount: -Math.abs(transaction.transactionAmount),
    }));

    // Aa teljes összeg kiszámítása
    this.switchView(this.currentView); // Beállítja az összegz
  }

  getButtonClasses(viewType: 'expenses' | 'incomes' | 'transactions') {
    return {
      'btn-link btn-lg fw-bold text-warning btn__title me-3':
        this.currentView === viewType,
      'btn-sm btn-warning me-3': this.currentView !== viewType,
    };
  }
}
