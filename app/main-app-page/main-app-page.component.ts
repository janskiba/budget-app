import { Component, OnInit } from '@angular/core';

import { ItemService } from '../shared/services/item.service';

@Component({
  selector: 'app-main-app-page',
  templateUrl: './main-app-page.component.html',
  styleUrls: ['./main-app-page.component.css'],
  providers: [ItemService],
})
export class MainAppPageComponent implements OnInit {
  currentColorMode: string = 'light-mode';

  constructor() {}

  ngOnInit() {}

  onColorModeChange(receivedColorMode: string) {
    this.currentColorMode = receivedColorMode;
  }
}
