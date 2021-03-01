import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Item } from '../../shared/models/item.model';
import { ItemService } from '../../shared/services/item.service';
import { EditItemComponent } from '../../edit-item/edit-item.component';
import { DataStorageService } from 'src/app/shared/services/data-storage.service';
import { BudgetCalculator } from 'src/app/shared/services/budget-calculator.service';

//interface for updating calculator on edititItem
export interface DialogData {
  oldItem: Item;
  newItem: Item;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
})
export class ItemComponent implements OnInit {
  //item received from itemsArray in item-list.component
  @Input() receivedItem: Item = new Item(null, '');

  constructor(
    private itemService: ItemService,
    private dataStorageService: DataStorageService,
    public dialog: MatDialog,
    private budgetCalculator: BudgetCalculator
  ) {}

  ngOnInit(): void {}

  onTrashIconClick() {
    if (this.dataStorageService.itemsRef) {
      this.dataStorageService.delete(this.receivedItem);
    } else {
      this.itemService.deleteItem(this.receivedItem);
    }
  }

  onEditIconClicked() {
    const dialogRef = this.dialog.open(EditItemComponent, {
      width: '450px',
      data: this.receivedItem,
    });

    //after saving item pass data to dataStorageService and budgetCalculator
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (this.dataStorageService.itemsRef) {
          //updating budget calculator for logged in users
          this.budgetCalculator.updateOnEditItem({
            oldItem: this.receivedItem,
            newItem: result,
          });

          this.dataStorageService.update(this.receivedItem.key, result);
        } else {
          this.itemService.editItem({
            oldItem: this.receivedItem,
            newItem: result,
          });
        }
      }
    });
  }
}
