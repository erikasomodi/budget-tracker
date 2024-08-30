import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-switcher',
  templateUrl: './button-switcher.component.html',
  styleUrl: './button-switcher.component.scss',
})
export class ButtonSwitcherComponent {
  @Input() label!: string;
  @Input() view?: 'expenses' | 'incomes' | 'transactions';
  @Input() currentView?: 'expenses' | 'incomes' | 'transactions';
  @Output() viewChange = new EventEmitter<
    'expenses' | 'incomes' | 'transactions'
  >();

  getButtonClasses(): string {
    return this.currentView && this.view && this.currentView === this.view
      ? 'btn-primary'
      : 'btn-warning';
  }

  switchView(): void {
    if (this.view) {
      this.viewChange.emit(this.view);
    }
  }
}
