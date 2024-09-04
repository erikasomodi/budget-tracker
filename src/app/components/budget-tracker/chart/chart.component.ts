import { Component, Input, OnInit } from '@angular/core';
import { TransactionModel } from '../../../models/transaction.model';
import { Chart, registerables } from 'chart.js';
import { UserModel } from '../../../models/user.model';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  @Input() item?: TransactionModel;
  @Input() icon?: string;
  @Input() transactions: TransactionModel[] = [];
  @Input() filteredTransactions: TransactionModel[] = [];
  @Input() startBudget?: UserModel['startBudget'];

  chart?: Chart;

  constructor(private themeService: ThemeService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.renderChart();
    this.setupThemeChangeListener();
  }

  renderChart() {
    const initTransaction = {
      transactionName: 'Kezdő egyenleg',
      transactionAmount: this.startBudget,
    };
    const transactionsWithStartBudget = [initTransaction, ...this.transactions];
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    let balance = this.startBudget || 0;
    const balances = [balance];

    for (let i = 1; i < transactionsWithStartBudget.length; i++) {
      balance += transactionsWithStartBudget[i].transactionAmount ?? 0;
      balances.push(balance);
    }

    const darkMode = this.themeService.isDarkTheme();

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: transactionsWithStartBudget.map((t) => t.transactionName),
        datasets: [
          {
            label: 'Balance',
            data: balances,
            backgroundColor: darkMode ? '#6edff6' : 'rgba(75, 192, 192, 0.2)',
            borderColor: darkMode ? 'rgba(75, 192, 192, 1)' : '#087990',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: darkMode ? 'white' : 'black',
            },
            grid: {
              color: darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
            },
          },
          x: {
            ticks: {
              color: darkMode ? 'white' : 'black',
            },
            grid: {
              color: darkMode
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.1)',
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: darkMode ? 'white' : 'black',
            },
          },
        },
      },
    });
  }

  setupThemeChangeListener() {
    const observer = new MutationObserver(() => {
      this.chart?.destroy(); // Eltávolítja a régi diagramot
      this.renderChart(); // Új diagram létrehozása az aktuális téma alapján
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-bs-theme'],
    });
  }
}
