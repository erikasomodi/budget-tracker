import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faEyeSlash,
  faMagnifyingGlass,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Output() enter = new EventEmitter<Event>();
  @Output() mouseleave = new EventEmitter<Event>();

  faEye: IconProp = faEye;
  faEyeSlash: IconProp = faEyeSlash;
  faUser: IconProp = faUser;
  faMagnifyingGlass: IconProp = faMagnifyingGlass;

  value: string = '';
  onChange: any = () => {};
  onTouched: any = () => {};

  getIcon(iconName: string): IconProp {
    switch (iconName) {
      case 'eye':
        return this.faEye;
      case 'eye-slash':
        return this.faEyeSlash;
      case 'user':
        return this.faUser;
      case 'magnifying-glass':
        return this.faMagnifyingGlass;
      default:
        return this.faUser; // Alapértelmezett ikon, ha az iconName nem található
    }
  }

  onEnter(event: Event): void {
    this.enter.emit(event);
  }

  onMouseleave(event: Event): void {
    this.mouseleave.emit(event);
  }

  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.value = inputElement.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
