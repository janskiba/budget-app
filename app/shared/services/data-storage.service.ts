import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';

import { Item } from '../models/item.model';
import { BudgetCalculator } from './budget-calculator.service';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  public itemsRef: AngularFirestoreCollection<Item> = null;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private authService: AuthService,
    private budgetCalculator: BudgetCalculator
  ) {
    afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.itemsRef = db
          .collection('users')
          .doc(`${user.uid}`)
          .collection('items');
      } else {
        console.log('User is not signed in');
      }
    });
  }

  create(item: Item): any {
    this.budgetCalculator.updateOnAddItem(item);
    return this.itemsRef.add({ ...item });
  }

  getAll(): AngularFirestoreCollection<Item> {
    return this.itemsRef;
  }

  update(key: string, value: any): Promise<void> {
    return this.itemsRef.doc(key).update(value);
  }

  delete(item: Item): Promise<void> {
    this.budgetCalculator.updateOnDeleteItem(item);
    return this.itemsRef.doc(item.key).delete();
  }
}
