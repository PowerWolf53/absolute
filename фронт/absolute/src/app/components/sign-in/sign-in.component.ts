import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ErrorStateMatcher} from '@angular/material';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }


  signIn() {
    this.http.post<any>('http://localhost:8080/api/absolute/auth/sign_in',
      {
        login: this.emailFormControl.value,
        password: this.passwordFormControl.value
      }).subscribe(data => {
      this.snackBar.open('Авторизация успешна', null, {
        duration: 2000,
      });
      this.router.navigate(['/', '/']);

    },
      error => {
        this.snackBar.open(error.error.message, null, {
            duration: 2000,
          }
        );
      });
  }

  handleSignUpClick() {
    this.router.navigate(['/', 'sign_up']);
  }
}
