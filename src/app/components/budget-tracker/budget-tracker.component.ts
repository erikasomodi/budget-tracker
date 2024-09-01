import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  faShirt,
  faGift,
  faPizzaSlice,
  faMoneyBill,
  faLaptop,
  faChartLine,
  faTrash,
  faMarker,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionModel } from '../../models/transaction.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTrackerComponent implements OnInit {
  budgetForm: FormGroup;
  user: UserModel;

  // expense icons
  faShirt: IconProp = faShirt;
  faGift: IconProp = faGift;
  faPizzaSlice: IconProp = faPizzaSlice;
  // income icons
  faMoneyBill: IconProp = faMoneyBill;
  faLaptop: IconProp = faLaptop;
  faChartLine: IconProp = faChartLine;
  faTrash: IconProp = faTrash;
  faMarker: IconProp = faMarker;

  // a jelenlegi összeg, amit a felhasználó lát a kiválasztott nézet szerint
  currentSum: number = 0;

  // kiadások
  expenses: TransactionModel[] = [
    {
      transactionName: 'Őszi cipő',
      transactionType: 'expense',
      transactionAmount: 24985,
      transactionDate: '2024-08-01',
      transactionCategory: 'Shopping',
      transactionMethod: 'Cash',
      icon: this.faShirt,
    },
    {
      transactionName: 'Futó nadrág',
      transactionType: 'expense',
      transactionAmount: 13435,
      transactionDate: '2024-08-01',
      transactionCategory: 'Shopping',
      transactionMethod: 'Bank Transfer',
      icon: this.faShirt,
    },
    {
      transactionName: 'Book',
      transactionType: 'expense',
      transactionAmount: 4985,
      transactionDate: '2024-08-03',
      transactionCategory: 'Gifts',
      transactionMethod: 'Cash',
      icon: this.faGift,
    },
    {
      transactionName: 'Pizza',
      transactionType: 'expense',
      transactionAmount: 5000,
      transactionDate: '2024-08-05',
      transactionCategory: 'Food',
      transactionMethod: 'Card',
      icon: this.faPizzaSlice,
    },
    {
      transactionName: 'Piac',
      transactionType: 'expense',
      transactionAmount: 15000,
      transactionDate: '2024-08-23',
      transactionCategory: 'Food',
      transactionMethod: 'Card',
      icon: this.faPizzaSlice,
    },
    {
      transactionName: 'Lidl',
      transactionType: 'expense',
      transactionAmount: 167327,
      transactionDate: '2024-08-23',
      transactionCategory: 'Food',
      transactionMethod: 'Card',
      icon: this.faPizzaSlice,
    },
    {
      transactionName: 'Futó cipő',
      transactionType: 'expense',
      transactionAmount: 45000,
      transactionDate: '2024-08-31',
      transactionCategory: 'Shopping',
      transactionMethod: 'Cash',
      icon: this.faShirt,
    },
  ];
  // bevételek
  incomes: TransactionModel[] = [
    {
      transactionName: 'Fizu',
      transactionType: 'income',
      transactionAmount: 450000,
      transactionDate: '2024-08-01',
      transactionCategory: 'Income',
      transactionMethod: 'Bank Transfer',
      icon: this.faMoneyBill,
    },
    {
      transactionName: 'Családi pótlék',
      transactionType: 'income',
      transactionAmount: 25000,
      transactionDate: '2024-08-03',
      transactionCategory: 'FreeLance',
      transactionMethod: 'Bank Transfer',
      icon: this.faMoneyBill,
    },
    {
      transactionName: 'Adó visszatérítés',
      transactionType: 'income',
      transactionAmount: 93272,
      transactionDate: '2024-08-03',
      transactionCategory: 'FreeLance',
      transactionMethod: 'Bank Transfer',
      icon: this.faMoneyBill,
    },
    {
      transactionName: 'Tőzsde',
      transactionType: 'income',
      transactionAmount: 5000,
      transactionDate: '2024-08-10',
      transactionCategory: 'Investments',
      transactionMethod: 'Bank Transfer',
      icon: this.faChartLine,
    },
    {
      transactionName: 'Családi pótlék',
      transactionType: 'income',
      transactionAmount: 25000,
      transactionDate: '2024-08-23',
      transactionCategory: 'FreeLance',
      transactionMethod: 'Bank Transfer',
      icon: this.faMoneyBill,
    },
    {
      transactionName: 'Tőzsde',
      transactionType: 'income',
      transactionAmount: 5000,
      transactionDate: '2024-08-23',
      transactionCategory: 'Investments',
      transactionMethod: 'Bank Transfer',
      icon: this.faChartLine,
    },
  ];

  // Az összes tranzakció, a kiadások negatív előjellel
  transactions: TransactionModel[] = [
    ...this.expenses.map((transaction) =>
      this.setExpensesNegative(transaction)
    ),
    ...this.incomes,
  ];
  @Input() label!: string;
  getButtonClasses(): string {
    return 'btn-warning';
  }

  filteredExpenses: TransactionModel[] = [];
  filteredIncomes: TransactionModel[] = [];
  filteredTransactions: TransactionModel[] = [];

  searchTerm: FormControl = new FormControl('');
  showNoResultsToast: boolean = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.budgetForm = this.fb.group({});
    // Felhasználó létrehozása
    this.user = {
      id: '1',
      name: 'Somodi Era',
      email: 'SomodiEra@gmail.com',
      password: 'PROGbudget2024',
      age: 40,
      married: true,
      numberOfChildren: 2,
      startBudget: 1000000,
      monthlySalary: 400000,
      transactions: [...this.expenses, ...this.incomes],
    };
  }

  ngOnInit() {
    // Negatív lesz az összeg
    this.expenses = this.expenses.map((transaction) =>
      this.setExpensesNegative(transaction)
    );

    // Az összes tranzakció sorbarendezése dátum szerint
    const sortedExpenses = this.sortTransactionsByDateArray(this.expenses);
    const sortedIncomes = this.sortTransactionsByDateArray(this.incomes);

    // Az expenses és incomes elemek külön sorbarendezése és összefűzése
    this.transactions = [...sortedExpenses, ...sortedIncomes];
    this.transactions = this.sortTransactionsByDateArray(this.transactions);

    // A szűrt kiadások, bevételek és tranzakciók beállítása az eredetikre
    this.filteredExpenses = sortedExpenses;
    this.filteredIncomes = sortedIncomes;
    this.filteredTransactions = this.transactions;

    // Az összegzés kiszámítása a kiválasztott nézet szerint, azaz a kiadásokra állítja be az összegzést, amikor a komponens betöltődik (transactions a default)
    this.switchView(this.currentView);

    // Subscribe to search term changes
    this.searchTerm.valueChanges.subscribe((term) => this.budgetSearch(term));
  }

  budgetSearch(searchTerm: string) {
    searchTerm = searchTerm.toLowerCase();

    // Filter transactions based on the current view
    if (this.currentView === 'expenses') {
      this.filteredTransactions = this.filteredExpenses.filter(
        (transaction) =>
          transaction.transactionName.toLowerCase().includes(searchTerm) ||
          transaction.transactionCategory.toLowerCase().includes(searchTerm)
      );
    } else if (this.currentView === 'incomes') {
      this.filteredTransactions = this.filteredIncomes.filter(
        (transaction) =>
          transaction.transactionName.toLowerCase().includes(searchTerm) ||
          transaction.transactionCategory.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredTransactions = this.transactions.filter(
        (transaction) =>
          transaction.transactionName.toLowerCase().includes(searchTerm) ||
          transaction.transactionCategory.toLowerCase().includes(searchTerm)
      );
    }
    // Toast megjelenítése, ha nincs találat
    this.showNoResultsToast = this.filteredTransactions.length === 0;

    // Az összegzés frissítése a szűrt tranzakciók alapján
    this.currentSum = this.filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.transactionAmount,
      0
    );
    if (!searchTerm && this.currentView === 'transactions') {
      this.currentSum += this.user.startBudget;
    }

    // Manually trigger change detection
    this.cdr.detectChanges();
  }
  hideToast() {
    this.showNoResultsToast = false;
    this.cdr.detectChanges();
  }
  // Sorbarendezés dátum szerint, a tranzakciók tömbjében
  sortTransactionsByDateArray(
    transactions: TransactionModel[]
  ): TransactionModel[] {
    return transactions.sort(
      (a, b) =>
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
    );
  }

  // A kiadások negatív előjellel, hogy az összegzés helyes legyen
  setExpensesNegative(transaction: TransactionModel): TransactionModel {
    return {
      ...transaction,
      transactionAmount: -Math.abs(transaction.transactionAmount),
    };
  }

  // Az összegzés a startBudget hozzáadásával, ha a transactions nézet van kiválasztva
  get transactionSums(): number {
    const expensesTotal = this.calculateSum('expenses');
    const incomesTotal = this.calculateSum('incomes');
    return this.user.startBudget - expensesTotal + incomesTotal;
  }

  // Az aktuális nézet
  currentView: 'expenses' | 'incomes' | 'transactions' = 'transactions';

  // Nézet váltás és az összegzés kiszámítása
  switchView(view: 'expenses' | 'incomes' | 'transactions') {
    this.currentView = view;
    this.currentSum = this.calculateSum(view);

    // Reset search term
    this.searchTerm.setValue('', { emitEvent: false });
    this.resetSearch();

    // Frissítsd a szűrt tranzakciókat a kiválasztott nézet alapján
    if (view === 'expenses') {
      this.filteredTransactions = this.filteredExpenses;
    } else if (view === 'incomes') {
      this.filteredTransactions = this.filteredIncomes;
    } else {
      this.filteredTransactions = this.transactions;
    }

    // Manuális nézet frissítés
    this.cdr.detectChanges();
  }

  resetSearch() {
    this.budgetSearch('');
  }

  // Az összegzés kiszámítása a kiválasztott nézet szerint
  calculateSum(view: 'expenses' | 'incomes' | 'transactions'): number {
    let transactions;
    // A kiadások, bevételek és az összes tranzakció kiválasztása a nézet szerint
    if (view === 'expenses') {
      transactions = this.user.transactions
        .filter((transaction) => transaction.transactionType === 'expense')
        .map((transaction) => this.setExpensesNegative(transaction));
      // A bevételek kiválasztása a nézet szerint
    } else if (view === 'incomes') {
      transactions = this.user.transactions.filter(
        (transaction) => transaction.transactionType === 'income'
      );
      // Az összes tranzakció kiválasztása
    } else {
      transactions = this.user.transactions.map((transaction) => {
        if (transaction.transactionType === 'expense') {
          return this.setExpensesNegative(transaction);
        }
        return transaction;
      });
    }
    // Sorbarendezés dátum szerint, a tranzakciók tömbjében
    this.sortTransactionsByDateArray(transactions);

    // Az összegzés kiszámítása a kiválasztott nézet szerint
    const sum = transactions.reduce(
      (sum, transaction) => sum + transaction.transactionAmount,
      0
    );

    if (view === 'transactions') {
      return this.user.startBudget + sum;
    }

    return sum; // startBudget hozzáadása a transactions nézethez
  }
}
