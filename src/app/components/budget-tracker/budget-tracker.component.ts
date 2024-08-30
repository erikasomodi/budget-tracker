import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  faShirt,
  faGift,
  faPizzaSlice,
  faMoneyBill,
  faLaptop,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import { TransactionModel } from "../../models/transaction.model";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { UserModel } from "../../models/user.model";

@Component({
  selector: "app-budget-tracker",
  templateUrl: "./budget-tracker.component.html",
  styleUrls: ["./budget-tracker.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BudgetTrackerComponent implements OnInit {
  user: UserModel;

  // expense icons
  faShirt: IconProp = faShirt;
  faGift: IconProp = faGift;
  faPizzaSlice: IconProp = faPizzaSlice;
  // income icons
  faMoneyBill: IconProp = faMoneyBill;
  faLaptop: IconProp = faLaptop;
  faChartLine: IconProp = faChartLine;

  // a jelenlegi összeg, amit a felhasználó lát a kiválasztott nézet szerint
  currentSum: number = 0;

  // kiadások
  expenses: TransactionModel[] = [
    {
      transactionName: "Őszi cipő",
      transactionType: "expense",
      transactionAmount: 24985,
      transactionDate: "2024-08-01",
      transactionCategory: "Shopping",
      transactionMethod: "Cash",
      icon: this.faShirt,
    },
    {
      transactionName: "Futó nadrág",
      transactionType: "expense",
      transactionAmount: 13435,
      transactionDate: "2024-08-01",
      transactionCategory: "Shopping",
      transactionMethod: "Bank Transfer",
      icon: this.faShirt,
    },
    {
      transactionName: "Book",
      transactionType: "expense",
      transactionAmount: 4985,
      transactionDate: "2024-08-03",
      transactionCategory: "Gifts",
      transactionMethod: "Cash",
      icon: this.faGift,
    },
    {
      transactionName: "Pizza",
      transactionType: "expense",
      transactionAmount: 5000,
      transactionDate: "2024-08-05",
      transactionCategory: "Food",
      transactionMethod: "Card",
      icon: this.faPizzaSlice,
    },
    {
      transactionName: "Piac",
      transactionType: "expense",
      transactionAmount: 15000,
      transactionDate: "2024-08-23",
      transactionCategory: "Food",
      transactionMethod: "Card",
      icon: this.faPizzaSlice,
    },
    {
      transactionName: "Lidl",
      transactionType: "expense",
      transactionAmount: 167327,
      transactionDate: "2024-08-23",
      transactionCategory: "Food",
      transactionMethod: "Card",
      icon: this.faPizzaSlice,
    },
  ];
  // bevételek
  incomes: TransactionModel[] = [
    {
      transactionName: "Fizu",
      transactionType: "income",
      transactionAmount: 450000,
      transactionDate: "2024-08-01",
      transactionCategory: "Income",
      transactionMethod: "Bank Transfer",
      icon: this.faMoneyBill,
    },
    {
      transactionName: "Családi pótlék",
      transactionType: "income",
      transactionAmount: 25000,
      transactionDate: "2024-08-03",
      transactionCategory: "FreeLance",
      transactionMethod: "Bank Transfer",
      icon: this.faMoneyBill,
    },
    {
      transactionName: "Adó visszatérítés",
      transactionType: "income",
      transactionAmount: 93272,
      transactionDate: "2024-08-03",
      transactionCategory: "FreeLance",
      transactionMethod: "Bank Transfer",
      icon: this.faMoneyBill,
    },
    {
      transactionName: "Tőzsde",
      transactionType: "income",
      transactionAmount: 5000,
      transactionDate: "2024-08-10",
      transactionCategory: "Investments",
      transactionMethod: "Bank Transfer",
      icon: this.faChartLine,
    },
    {
      transactionName: "Családi pótlék",
      transactionType: "income",
      transactionAmount: 25000,
      transactionDate: "2024-08-23",
      transactionCategory: "FreeLance",
      transactionMethod: "Bank Transfer",
      icon: this.faMoneyBill,
    },
    {
      transactionName: "Tőzsde",
      transactionType: "income",
      transactionAmount: 5000,
      transactionDate: "2024-08-23",
      transactionCategory: "Investments",
      transactionMethod: "Bank Transfer",
      icon: this.faChartLine,
    },
  ];

  constructor() {
    // Felhasználó létrehozása
    this.user = {
      id: "1",
      name: "Somodi Era",
      email: "SomodiEra@gmail.com",
      password: "PROGbudget2024",
      age: 40,
      married: true,
      numberOfChildren: 2,
      startBudget: 1000000,
      monthlySalary: 400000,
      transactions: [...this.expenses, ...this.incomes],
    };
  }
  // A kiadások negatív előjellel, hogy az összegzés helyes legyen
  setExpensesNegative(transaction: TransactionModel): TransactionModel {
    return {
      ...transaction,
      transactionAmount: -Math.abs(transaction.transactionAmount),
    };
  }

  // Az összes tranzakció, a kiadások negatív előjellel
  transactions: TransactionModel[] = [
    ...this.expenses.map((transaction) =>
      this.setExpensesNegative(transaction)
    ),
    ...this.incomes,
  ];

  // Az összegzés a startBudget hozzáadásával, ha a transactions nézet van kiválasztva
  get transactionSums(): number {
    const expensesTotal = this.calculateSum("expenses");
    const incomesTotal = this.calculateSum("incomes");
    return this.user.startBudget - expensesTotal + incomesTotal;
  }

  // Az aktuális nézet
  currentView: "expenses" | "incomes" | "transactions" = "transactions";

  // Nézet váltás és az összegzés kiszámítása
  switchView(view: "expenses" | "incomes" | "transactions") {
    this.currentView = view;
    this.currentSum = this.calculateSum(view);
  }

  // Az összegzés kiszámítása a kiválasztott nézet szerint
  calculateSum(view: "expenses" | "incomes" | "transactions"): number {
    let transactions;
    // A kiadások, bevételek és az összes tranzakció kiválasztása a nézet szerint
    if (view === "expenses") {
      transactions = this.user.transactions
        .filter((transaction) => transaction.transactionType === 'expense')
        .map((transaction) => this.setExpensesNegative(transaction));
      // A bevételek kiválasztása a nézet szerint
    } else if (view === "incomes") {
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

    // Az összegzés kiszámítása a kiválasztott nézet szerint
    const sum = transactions.reduce(
      (sum, transaction) => sum + transaction.transactionAmount,
      0
    );

    return view === "transactions" ? this.user.startBudget + sum : sum; // startBudget hozzáadása a transactions nézethez
  }

  ngOnInit() {
    // Negatív lesz az összeg
    this.expenses = this.expenses.map((transaction) =>
      this.setExpensesNegative(transaction)
    );
    // Az összes tranzakció sorbarendezése dátum szerint
    this.sortTransactionsByDate();

    //  Az összegzés kiszámítása a kiválasztott nézet szerint, azaz a kiadásokra állítja be az összegzést, amikor a komponens betöltődik (transactions a default)
    this.switchView(this.currentView);
  }

  // Sorbarendezés dátum szerint, a tranzakciók tömbjében
  sortTransactionsByDate() {
    this.transactions.sort((a, b) => {
      return (
        new Date(a.transactionDate).getTime() -
        new Date(b.transactionDate).getTime()
      );
    });
  }
}
