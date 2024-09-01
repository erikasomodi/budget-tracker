import { Component, Input } from '@angular/core';
import { faMarker, faTrash } from '@fortawesome/free-solid-svg-icons';
import { TransactionModel } from '../../../models/transaction.model';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent {
  @Input() item!: TransactionModel;
  faMarker = faMarker;
  faTrash = faTrash;
}
