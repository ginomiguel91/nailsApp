import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  selectedLn: string = '';
  loginForm!: FormGroup;
  isSignUpMode: boolean = false;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    this.route.url.subscribe((url) => {
      this.isSignUpMode = url[0].path === 'sign-up';
    });
  }
  toggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
    this.router.navigate([this.isSignUpMode ? '/auth/sign-up' : '/auth/login']);
  }
  /**
   * The `login` function in TypeScript handles user authentication by sending login credentials to the
   * server and redirecting to the dashboard upon successful login or displaying an error message for
   * incorrect credentials.
   */
  //   login() {
  //     const { username, password } = this.loginForm.value;
  //     this.authService.login(username, password).subscribe((resp) => {
  //       if (resp) {
  //         this.route.navigateByUrl('/dashboard');

  //         console.log('resp:', resp);
  //       } else {
  // this.translate.get(['login.access_error_title','login.access_error_content'])
  // .subscribe(translations =>

  // {
  //   Swal.fire(
  //     translations['login.access_error_title'],
  //     translations['login.access_error_content'],
  //     'error'
  //   );

  // })

  //       }
  //     });
  //   }
  /* The `onSubmit` function in the `LoginComponent` class is triggered when a form submission event
  occurs. It first checks if the login form is valid by calling `this.loginForm.valid`. If the form
  is valid, it retrieves the email and password values from the form and then calls the
  `logInWithEmailAndPassword` method from the `authService` service with these email and password
  parameters. This function is typically used to handle form submissions for logging in a user with
  the provided credentials. */
  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.isSignUpMode) {
        this.authService.signUpWithEmailAndPassword(email, password);
      } else {
        this.authService.logInWithEmailAndPassword(email, password);
      }
    }
  }
  /* The `logIn` method in the LoginComponent class is a function that takes two parameters, `email`
  and `password`, and calls the `logInWithEmailAndPassword` method from the `authService` service
  with these parameters. This method is used to log in a user with the provided email and password
  credentials. */
  logIn(email: string, password: string) {
    this.authService.logInWithEmailAndPassword(email, password);
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }

  logInWithApple() {
    this.authService.logInWithAppleProvider();
  }
  signUp(email: string, password: string) {
    this.authService.signUpWithEmailAndPassword(email, password);
  }

  /**
   * The function errorField(field: string) returns a CSS class based on the validity and interaction
   * state of a form control in a TypeScript application.
   * @param {string} field - The `field` parameter in the `errorField` function is a string that
   * represents the name of a form control in the `loginForm`. This function is used to determine the CSS
   * class that should be applied to the input field based on its validity and interaction state.
   * @returns The `errorField` method is returning a string value based on the validation status of the
   * form control specified by the `field` parameter. If the control is invalid and either dirty or
   * touched, it returns 'input is-danger', indicating an error state. Otherwise, it returns 'input
   * is-success', indicating a success state.
   */
  // errorField(field: string): string {
  //   const control = this.loginForm.get(field);
  //   return control?.invalid && (control?.dirty || control?.touched)
  //     ? 'input is-danger'
  //     : 'input is-success';
  // }

  /**
   * The function `msgErrorsClassField` returns a CSS class based on the error status of a given field.
   * @param {string} field - The `msgErrorsClassField` function takes a `field` parameter, which is a
   * string representing the field being checked for errors. The function checks the error status of the
   * field and returns a CSS class name based on whether the error is of type 'input is-danger' or not.
   * If the
   * @returns The `msgErrorsClassField` function is returning a string value based on the condition. If
   * the error field for the input is 'input is-danger', it will return 'help is-danger'. Otherwise, it
   * will return 'help is-success'.
   */
  // msgErrorsClassField(field: string): string {
  //   if (this.errorField(field) === 'input is-danger') {
  //     return 'help is-danger';
  //   } else {
  //     return 'help is-success';
  //   }
  // }
  /**
   * The function `msgErrorValidation` checks if a field is valid or invalid and returns a corresponding
   * message.
   * @param {string} field - The `field` parameter in the `msgErrorValidation` function represents the
   * name of the field that is being validated for errors.
   * @returns The `msgErrorValidation` function returns a message indicating whether the field is valid
   * or invalid. If the error field for the given input is 'input is-danger', it returns '¡The field
   * [field] is invalid !'. Otherwise, it returns '¡The field [field] is valid !'.
   */
  // msgErrorValidation(field: string): string {
  //   const fieldInvalidKey = 'validation.field_invalid';
  //   const fieldValidKey = 'validation.field_valid';
  //   if (this.errorField(field) === 'input is-danger') {
  //     return this.translate.instant(fieldInvalidKey, { field });
  //   } else {
  //     return this.translate.instant(fieldValidKey, { field });
  //   }
  // }

  /**
   * The function `changeLanguage` in TypeScript changes the language used for translation and updates
   * the selected language.
   * @param {string} language - The `changeLanguage` function takes a `language` parameter of type
   * string. This parameter is used to set the language for translation using the
   * `this.translate.use(language)` method. Additionally, the `selectedLn` property is updated to store
   * the selected language.
   */
  changeLanguage(language: string) {
    this.translate.use(language);
    this.selectedLn = language;
  }
}
