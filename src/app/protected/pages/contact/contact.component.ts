import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  get phone() {
    return environment.contactPhone;
  }

  get email() {
    return environment.contactEmail;
  }
  get address() {
    return environment.contactAddress;
  }
}
