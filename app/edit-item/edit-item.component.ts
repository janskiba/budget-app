import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from '../shared/models/item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<EditItemComponent>,

    //access the data passet to dialog component from item-component
    @Inject(MAT_DIALOG_DATA) public item: Item
  ) {}

  ngOnInit(): void {}

  //close edit-item dilog
  onFormChanged(item: Item) {
    this.dialogRef.close(item);
  }
}
