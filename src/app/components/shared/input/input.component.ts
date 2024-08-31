import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const inputElem = event.target as HTMLInputElement;
    const searchTerms = inputElem.value;
    this.search.emit(searchTerms);
  }
}
