import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { NgForm } from '@angular/forms';
import { ItemService } from '../shared/services/item.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent implements OnInit {
  //item from edit-item-component to control to change editItemActive status
  @Input() item: Item;
  //inform edit item about changes in item
  @Output() formSubmitted: EventEmitter<Item> = new EventEmitter<Item>();

  //chack activation status of edit-item-component
  editItemActive: boolean;

  constructor(
    private itemService: ItemService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit(): void {
    //open regular add form or edit-item-form
    if (this.item) {
      this.editItemActive = true;
    } else {
      this.editItemActive = false;
      //(null, '') to avoid error 'Cannot read property of undefined' in ngModel
      this.item = new Item(null, '');
    }
  }

  onSubmit(itemToPass: NgForm) {
    if (this.editItemActive === false) {
      if (this.dataStorageService.itemsRef) {
        this.dataStorageService.create(itemToPass.value);
      } else {
        this.itemService.addItem(itemToPass.value);
      }
    } else {
      this.formSubmitted.emit(itemToPass.value);
    }
    //reset input
    itemToPass.reset();
  }
}
