import { Observable } from 'rxjs';
import { AuthService } from './../../services/auth.service';
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
  faList,
  faChartColumn,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionModel } from '../../models/transaction.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { UserModel } from '../../models/user.model';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrls: ['./budget-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTrackerComponent implements OnInit {
  budgetForm: FormGroup;
  user: UserModel = {
    id: '',
    name: '',
    email: '',
    password: '',
    age: 0,
    married: false,
    numberOfChildren: 0,
    startBudget: 0,
    monthlySalary: 0,
    transactions: [],
    role: 'user',
  };
  userName$: Observable<string>;
  userId$: Observable<string | null>;
  userName: string = '';

  // expense icons
  faShirt: IconProp = faShirt;
  faGift: IconProp = faGift;
  faPizzaSlice: IconProp = faPizzaSlice;
  // income icons
  faMoneyBill: IconProp = faMoneyBill;
  faLaptop: IconProp = faLaptop;
  faChartLine: IconProp = faChartLine;
  faChartColumn: IconProp = faChartColumn;
  faTrash: IconProp = faTrash;
  faMarker: IconProp = faMarker;
  faList: IconProp = faList;

  // a jelenlegi összeg, amit a felhasználó lát a kiválasztott nézet szerint
  currentSum: number = 0;

  // kiadások
  expenses: TransactionModel[] = [];
  // bevételek
  incomes: TransactionModel[] = [];

  // Az összes tranzakció, a kiadások negatív előjellel
  transactions: TransactionModel[] = [];
  @Input() label!: string;
  getButtonClasses(): string {
    return 'btn-warning';
  }

  filteredExpenses: TransactionModel[] = [];
  filteredIncomes: TransactionModel[] = [];
  filteredTransactions: TransactionModel[] = [];

  searchTerm: FormControl = new FormControl('');
  showNoResultsToast: boolean = false;

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    this.budgetForm = this.fb.group({});
    this.userName$ = this.authService.userName$;
    this.userId$ = this.authService.userId$;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userName = params['userName'];
      console.log(
        `Received userName in BudgetTrackerComponent: ${this.userName}`
      );
    });
    this.authService.getLoggedInUser().subscribe((user) => {
      this.user = user;
      this.expenses = user.transactions
        .filter((transaction) => transaction.transactionType === 'expense')
        .map((transaction) => this.setExpensesNegative(transaction));
      this.incomes = user.transactions.filter(
        (transaction) => transaction.transactionType === 'income'
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
      this.filteredTransactions = user.transactions;

      // Az összegzés kiszámítása a kiválasztott nézet szerint, azaz a kiadásokra állítja be az összegzést, amikor a komponens betöltődik (transactions a default)
      this.switchView(this.currentView);

      // Feliratkozás a keresőmező értékének változásaira
      this.searchTerm.valueChanges.subscribe((term) => this.budgetSearch(term));
      this.refreshTransactions();
    });
  }

  // Az összegzés a startBudget hozzáadásával, ha a transactions nézet van kiválasztva
  get transactionSums(): number {
    const expensesTotal = this.calculateSum('expenses');
    const incomesTotal = this.calculateSum('incomes');
    return this.user.startBudget - expensesTotal + incomesTotal;
  }

  // Az aktuális nézet
  currentView: 'expenses' | 'incomes' | 'transactions' = 'transactions';
  visual: 'chart' | 'list' = 'list';
  visualIcon: IconProp = faChartLine;

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

  // Keresőmező eseménykezelője
  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value;
    this.budgetSearch(searchTerm);
  }
  // Az Enter gomb megakadályozása a keresőmezőben (nem frissíti az oldalt)
  preventEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  }
  // Keresőmező frissítése a keresőmező tartalmával (a keresőmező tartalmának megváltozásakor)
  budgetSearch(searchTerm: string): void {
    if (!searchTerm) {
      searchTerm = '';
    } else {
      searchTerm = searchTerm.toLowerCase();
    }

    // Tranzakciók szűrése a keresőmező tartalma alapján
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

    // Toastr értesítés megjelenítése, ha nincs találat
    if (this.filteredTransactions.length === 0) {
      this.toastr.error('No results found.');
    }

    // Az összegzés frissítése a szűrt tranzakciók alapján
    this.currentSum = this.filteredTransactions.reduce(
      (sum, transaction) => sum + transaction.transactionAmount,
      0
    );
    if (!searchTerm && this.currentView === 'transactions') {
      this.currentSum += this.user.startBudget;
    }

    // Manuális nézet frissítés
    this.cdr.detectChanges();
  }

  // Vizuális nézet váltása
  toggleVisual() {
    this.visual = this.visual === 'list' ? 'chart' : 'list';
    this.visualIcon = this.visual === 'list' ? faChartLine : faList;
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
  refreshTransactions() {
    if (this.user && this.user.id) {
      this.userService.getUserTransactions(this.user.id).subscribe(transactions => {
        this.user.transactions = transactions;
  
        // Az összes tranzakció sorbarendezése dátum szerint
        const sortedExpenses = this.sortTransactionsByDateArray(
          transactions.filter((transaction) => transaction.transactionType === 'expense')
            .map((transaction) => this.setExpensesNegative(transaction))
        );
        const sortedIncomes = this.sortTransactionsByDateArray(
          transactions.filter((transaction) => transaction.transactionType === 'income')
        );
  
        // Az expenses és incomes elemek külön sorbarendezése és összefűzése
        this.transactions = [...sortedExpenses, ...sortedIncomes];
        this.transactions = this.sortTransactionsByDateArray(this.transactions);
  
        // A szűrt tranzakciók beállítása az eredetikre
        this.filteredTransactions = this.transactions;
  
        // Az összegzés kiszámítása a kiválasztott nézet szerint
        this.currentSum = this.calculateSum(this.currentView);
  
        // Manuális nézet frissítés
        this.cdr.detectChanges();
      });
    } else {
      console.error('User ID is not available.');
    }
  }
  // Az összegzés kiszámítása a kiválasztott nézet szerint
  calculateSum(view: 'expenses' | 'incomes' | 'transactions'): number {
    let transactions;
    if (view === 'expenses') {
      transactions = this.user.transactions
        .filter((transaction) => transaction.transactionType === 'expense')
        .map((transaction) => this.setExpensesNegative(transaction));
    } else if (view === 'incomes') {
      transactions = this.user.transactions.filter(
        (transaction) => transaction.transactionType === 'income'
      );
    } else {
      transactions = this.user.transactions.map((transaction) => {
        if (transaction.transactionType === 'expense') {
          return this.setExpensesNegative(transaction);
        }
        return transaction;
      });
    }
    this.sortTransactionsByDateArray(transactions);
  
    const sum = transactions.reduce(
      (sum, transaction) => sum + transaction.transactionAmount,
      0
    );
  
    if (view === 'transactions') {
      return this.user.startBudget + sum;
    }
  
    return sum;
  }
}
