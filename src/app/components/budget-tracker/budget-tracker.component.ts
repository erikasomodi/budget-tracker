import { Component } from '@angular/core';
import {
  faShirt,
  faGift,
  faPizzaSlice,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-budget-tracker',
  templateUrl: './budget-tracker.component.html',
  styleUrl: './budget-tracker.component.scss',
})
export class BudgetTrackerComponent {
  faShirt = faShirt;
  faGift = faGift;
  faPizzaSlice = faPizzaSlice;
  expenses = [
    {
      category: 'Clothes',
      amount: 498.5,
      percentage: 32,
      icon: this.faShirt,
    },
    {
      category: 'Gifts',
      amount: 344.45,
      percentage: 21,
      icon: this.faGift,
    },
    {
      category: 'Food',
      amount: 230.5,
      percentage: 12,
      icon: this.faPizzaSlice,
    },
    // Add more expenses as necessary
  ];
}
