import { Component, Input, OnInit } from '@angular/core';
import { TransactionModel } from '../../../models/transaction.model';
import { Chart, registerables } from 'chart.js';
import { UserModel } from '../../../models/user.model';

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
  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.renderChart();
    console.log(this.startBudget);
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
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: transactionsWithStartBudget.map((t) => t.transactionName),
        datasets: [
          {
            label: 'Cumulative Balance',
            data: balances,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
