import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selectedLn: string = '';
  ngOnInit(): void {
    this.loginForm.markAllAsTouched();
  }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private authService: AuthService,
    private translate: TranslateService
  ) {}

  login() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe((resp) => {
      if (resp) {
        this.route.navigateByUrl('/dashboard');

        console.log('resp:', resp);
      } else {
        Swal.fire(
          'Error al ingresar',
          '¡Usuario o contraseña incorrectos!',
          'error'
        );
      }
    });
  }

  errorField(field: string): string {
    const control = this.loginForm.get(field);
    return control?.invalid && (control?.dirty || control?.touched)
      ? 'input is-danger'
      : 'input is-success';
  }

  msgErrorsClassField(field: string): string {
    if (this.errorField(field) === 'input is-danger') {
      return 'help is-danger';
    } else {
      return 'help is-success';
    }
  }
  msgErrorValidation(field: string): string {
    if (this.errorField(field) === 'input is-danger') {
      return '¡The field' + ' ' + field + ' ' + 'is invalid !';
    } else {
      return '¡The field' + ' ' + field + ' ' + 'is valid !';
    }
  }

  changeLanguage(language: string) {
    this.translate.use(language);
    this.selectedLn = language;
  }
}
