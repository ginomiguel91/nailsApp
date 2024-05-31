import { Component, EventEmitter, Output } from '@angular/core';
import { faLanguage, faCheck } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-language-dropdown',
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.css'],
})
export class LanguageDropdownComponent {
  faLanguage = faLanguage;
  faCheck = faCheck;
  selectedLn: string = '';
  @Output() languageItemEvent = new EventEmitter<string>();

/**
 * The `languageItem` function emits an event with a value, logs the selected value, and assigns the
 * value to `selectedLn`.
 * @param {string} value - The `value` parameter in the `languageItem` function represents the value
 * that is being passed to the function when it is called. This value is then emitted using
 * `this.languageItemEvent.emit(value)`, logged to the console with `console.log('selectedLn', value)`,
 * and assigned to
 */
  languageItem(value: string) {
    this.languageItemEvent.emit(value);
    console.log('selectedLn', value);
    this.selectedLn = value;
  }
}
