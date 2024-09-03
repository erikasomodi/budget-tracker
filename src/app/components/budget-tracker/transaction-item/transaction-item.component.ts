import { Component, Input } from '@angular/core';
import {
  faTrash,
  faMarker,
  faTshirt,
  faGift,
  faPizzaSlice,
  faLaptop,
  faChartLine,
  faCreditCard,
  faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionModel } from '../../../models/transaction.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent {
  @Input() item!: TransactionModel;
  @Input() icon!: IconProp;
  faMarker = faMarker;
  faTrash = faTrash;
  faTshirt = faTshirt;
  faGift = faGift;
  faPizzaSlice = faPizzaSlice;
  faLaptop = faLaptop;
  faChartLine = faChartLine;
  faCreditCard = faCreditCard;
  faMoneyBill = faMoneyBill;

  getIcon(): IconProp {
    switch (this.item.transactionCategory) {
      case 'shopping':
        return this.faTshirt;
      case 'gifts':
        return this.faGift;
      case 'food':
        return this.faPizzaSlice;
      case 'electronic items':
        return this.faLaptop;
      case 'investments':
        return this.faChartLine;
      case 'income':
        return this.faCreditCard;
      case 'freeLance':
        return this.faMoneyBill;
      default:
        return this.icon;
    }
  }
}
