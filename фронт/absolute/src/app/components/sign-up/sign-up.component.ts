import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MyErrorStateMatcher} from '../sign-in/sign-in.component';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);

  confirmPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(6)
  ]);
  matcher = new MyErrorStateMatcher();

  constructor(private http: HttpClient, private router: Router,  private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }


  signUp() {
    this.http.post<any>('http://localhost:8080/api/absolute/auth/sign_up',
      {
        login: this.emailFormControl.value,
        password: this.passwordFormControl.value
      }).subscribe(data => {
      this.snackBar.open('Регистрация успешна', null, {
        duration: 2000,
      });
      this.router.navigate(['/', '/']);

    }, error => {
      this.snackBar.open(error.error.message, null, {
          duration: 2000,
        }
      );
    });
  }

  handleSignInClick() {
    this.router.navigate(['/', '/']);
  }
}
