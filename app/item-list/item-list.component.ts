import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemService } from '../shared/services/item.service';
import { Item } from '../shared/models/item.model';
import { DataStorageService } from '../shared/services/data-storage.service';
import { BudgetCalculator } from '../shared/services/budget-calculator.service';

//w interfejsie zapisuje dane które przekarze do app.component do uaktualnienia kalkulatora

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit, OnDestroy {
  itemsArray: Item[];
  private itemChangeSubscription: Subscription;

  constructor(
    private itemService: ItemService,
    private dataStorageService: DataStorageService,
    private budgetCalculator: BudgetCalculator
  ) {}

  ngOnInit(): void {
    //if user is signed in retrieve items from firestore
    if (this.dataStorageService.itemsRef) {
      this.retrieveItems();
    }
    //not signed in users
    else {
      //listen for changes
      this.itemChangeSubscription = this.itemService.itemsArrayChanged.subscribe(
        (itemsArray: Item[]) => {
          this.itemsArray = itemsArray;
        }
      );
    }
  }

  ngOnDestroy() {
    //not signed in users
    if (!this.dataStorageService.itemsRef) {
      this.itemChangeSubscription.unsubscribe();
    }
  }

  retrieveItems(): void {
    this.dataStorageService
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) => {
          //save key to each item
          return changes.map((c) => ({
            key: c.payload.doc.id,
            ...c.payload.doc.data(),
          }));
        })
      )
      .subscribe((data) => {
        if (this.itemsArray === undefined) {
          //array is undefined only on page reloading and list of items is retrieved from firebase
          data.forEach((item) =>
            this.budgetCalculator.updateOnLoadingUserData(item)
          );
        }
        console.log('this.itemsArray is defined');
        this.itemsArray = data;
      });
  }
}
