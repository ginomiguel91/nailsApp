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

  languageItem(value: string) {
    this.languageItemEvent.emit(value);
    console.log('selectedLn', value);
    this.selectedLn = value;
  }
}
