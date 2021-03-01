import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['../main-app-page/main-app-page.component.css'],
})
export class DemoComponent implements OnInit {
  currentColorMode: string = 'light-mode';

  constructor() {}

  ngOnInit() {}

  onColorModeChange(receivedColorMode: string) {
    this.currentColorMode = receivedColorMode;
  }
}
