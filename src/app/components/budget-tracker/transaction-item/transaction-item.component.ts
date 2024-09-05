import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
  faUmbrellaBeach,
  faCar,
  faPlane,
  faSackDollar,
  faMoneyBillTrendUp,
  faHandHoldingDollar,
} from '@fortawesome/free-solid-svg-icons';
import { TransactionModel } from '../../../models/transaction.model';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-transaction-item',
  templateUrl: './transaction-item.component.html',
  styleUrls: ['./transaction-item.component.scss'],
})
export class TransactionItemComponent implements OnInit, OnDestroy {
  @Input() item!: TransactionModel;
  @Input() icon!: IconProp;
  @Input() id!: string | null;
  @Output() transactionDeleted = new EventEmitter<void>();
  faMarker = faMarker;
  faTrash = faTrash;
  faTshirt = faTshirt;
  faUmbrellaBeach = faUmbrellaBeach;
  faGift = faGift;
  faPizzaSlice = faPizzaSlice;
  faLaptop = faLaptop;
  faChartLine = faChartLine;
  faCreditCard = faCreditCard;
  faMoneyBill = faMoneyBill;
  faCar = faCar;
  faPlane = faPlane;
  faSackDollar = faSackDollar;
  faMoneyBillTrendUp = faMoneyBillTrendUp;
  faHandHoldingDollar = faHandHoldingDollar;

  deleteSubscription?: Subscription;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {}

  getIcon(): IconProp {
    switch (this.item.transactionCategory) {
      case 'shopping':
        return this.faTshirt;
      case 'recreation':
        return this.faUmbrellaBeach;
      case 'gifts':
        return this.faGift;
      case 'food':
        return this.faPizzaSlice;
      case 'electronic items':
        return this.faLaptop;
      case 'investments':
        return this.faMoneyBillTrendUp;
      case 'travel':
        return this.faCar;
      case 'flight':
        return this.faPlane;
      case 'income':
        return this.faSackDollar;
      case 'freeLance':
        return this.faHandHoldingDollar;
      default:
        return this.icon;
    }
  }
  transactionDelete(transactionId: number | undefined) {
    if (transactionId && confirm(`Do you wanna delete this transaction?`)) {
      this.deleteSubscription = this.userService
        .removeTransactionFromUser(this.id!, transactionId)
        .subscribe({
          next: () => {
            console.log('Tranzakció sikeresen törölve.'),
              this.toastr.success('Tranzakció sikeresen törölve');
              this.transactionDeleted.emit(); // Esemény kibocsátása
          },
          error: (error) => {
            console.error('Hiba történt a tranzakció törlésekor:', error),
              this.toastr.error('Hiba történt a tranzakció törlésekor');
          },
        });
    }
  }
  transactionUpdate(id: number | undefined) {
    console.log(id);
    this.router.navigate(['transaction-reg', id]);
  }
  ngOnDestroy(): void {
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }
}
