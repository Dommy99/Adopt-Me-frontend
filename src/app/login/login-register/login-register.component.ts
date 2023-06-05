import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  form: FormGroup;

  constructor(private http: HttpClient) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  register(): void {
    if (this.form.valid) {
      this.http.post('http://localhost:8080/auth/users/register/', this.form.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }

  login(): void {
    if (this.form.valid) {
      this.http.post('http://localhost:8080/auth/users/login/', this.form.value).subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
    }
  }
}
