import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogData } from 'src/app/item-list/item/item.component';

import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class BudgetCalculator {
  balansTotal: number = 0;
  incomesTotal: number = 0;
  expensesTotal: number = 0;

  updateOnAddItem(item: Item) {
    this.balansTotal += item.amount;
    if (item.amount > 0) {
      this.incomesTotal += item.amount;
    } else {
      this.expensesTotal += item.amount;
    }
  }

  updateOnDeleteItem(item: Item) {
    this.balansTotal -= item.amount;
    if (item.amount > 0) {
      this.incomesTotal -= item.amount;
    } else {
      this.expensesTotal -= item.amount;
    }
  }

  updateOnEditItem(data: DialogData) {
    this.balansTotal -= data.oldItem.amount;
    this.balansTotal += data.newItem.amount;
    if (data.oldItem.amount > 0) {
      //jeśli kwota w oldItem jest dodatnia i kwota w newItem jest dodatnia to odejmuje kwote z oldItem od sumy dochodów i dodaje tą newItem do sumy dochodów
      if (data.newItem.amount > 0) {
        this.incomesTotal -= data.oldItem.amount;
        this.incomesTotal += data.newItem.amount;
      }

      //jeśli kwota w oldItem jest dodatnia i kwota w newItem jest ujemna to to odejmuje kwote z oldItem od sumy dochodów i dodaje tą newItem do sumy wydatków
      else {
        this.incomesTotal -= data.oldItem.amount;
        this.expensesTotal += data.newItem.amount;
      }
    } else {
      //jeśli kwota w oldItem jest ujemna i kwota w newItem jest ujemna to to odejmuje kwote z oldItem od sumy wydatków i dodaje tą newItem do sumy wydatków
      if (data.newItem.amount < 0) {
        this.expensesTotal -= data.oldItem.amount;
        this.expensesTotal += data.newItem.amount;
      } else {
        this.expensesTotal -= data.oldItem.amount;
        this.incomesTotal += data.newItem.amount;
      }
    }
  }

  //updating budget calculaton on user login and reloading page
  updateOnLoadingUserData(item: Item) {
    this.updateOnAddItem(item);
  }
}
