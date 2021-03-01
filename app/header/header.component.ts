import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BudgetCalculator } from '../shared/services/budget-calculator.service';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //display color mode status in the view
  changeToColorMode: string = 'Enable';

  //pass information to the parent
  colorMode: string = 'light-mode';
  @Output() colorModeChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public authService: AuthService,
    public budgetCalculator: BudgetCalculator
  ) {}

  ngOnInit(): void {}

  onColorModeChangeClick() {
    if (this.colorMode === 'dark-mode') {
      this.colorMode = 'light-mode';
      this.changeToColorMode = 'Enable';
    } else {
      this.colorMode = 'dark-mode';
      this.changeToColorMode = 'Disable';
    }

    this.colorModeChanged.emit(this.colorMode);
  }

  onLogoutIconClick() {
    this.authService.googleSignOut();
  }
}
