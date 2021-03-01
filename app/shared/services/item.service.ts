import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Item } from '../models/item.model';
import { DialogData } from '../../item-list/item/item.component';
import { BudgetCalculator } from '../services/budget-calculator.service';

@Injectable({ providedIn: 'root' })
export class ItemService {
  itemsArrayChanged = new Subject<Item[]>();
  private itemsArray: Item[] = new Array<Item>();

  constructor(private budgetCalculator: BudgetCalculator) {}

  getItemsArray() {
    //slice return array copy
    return this.itemsArray.slice();
  }

  addItem(item: Item) {
    this.itemsArray.push(item);
    this.itemsArrayChanged.next(this.itemsArray.slice());
    this.budgetCalculator.updateOnAddItem(item);
  }

  deleteItem(item: Item) {
    this.itemsArray.splice(this.itemsArray.indexOf(item), 1);
    this.itemsArrayChanged.next(this.itemsArray.slice());
    this.budgetCalculator.updateOnDeleteItem(item);
  }

  editItem(data: DialogData) {
    this.itemsArray[this.itemsArray.indexOf(data.oldItem)] = data.newItem;
    this.budgetCalculator.updateOnEditItem(data);
    this.itemsArrayChanged.next(this.itemsArray.slice());
  }
}
