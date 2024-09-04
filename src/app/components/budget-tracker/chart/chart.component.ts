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
  }

  renderChart() {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.transactions.map((t) => t.transactionName),
        datasets: [
          {
            label: 'Transaction Amount',
            data: this.transactions.map((t) => t.transactionAmount),
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
