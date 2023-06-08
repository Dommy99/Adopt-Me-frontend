import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginRegisterComponent {
  form: FormGroup;  // This will hold our form

  constructor(
    private http: HttpClient,  // To make HTTP requests
    private authService: AuthService,  // Authentication service
    private router: Router  // To programmatically navigate
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),  // Email input field with validators
      password: new FormControl('', [Validators.required])  // Password input field with validators
    });
  }

  register(): void {
    if (this.form.valid) {  // If the form is valid
      console.log(this.form.value);  // Log the form value
      
      // Make a POST request to register a user
      this.http.post('http://localhost:8080/auth/users/register/', this.form.value).subscribe(
        (response) => {  // If the request was successful
          console.log(response);  // Log the response
        },
        (error) => {  // If an error occurred
          console.log(error);  // Log the error
          if (error.status === 409) {
            alert('This user already exists. Please try a different email.');  // Alert the user
          } else {
            alert('An error occurred. Please try again later.');  // Alert the user
          }
        }
      );
    }
  }

  login(): void {
    if (this.form.valid) {  // If the form is valid
      // Make a POST request to login a user
      this.http.post('http://localhost:8080/auth/users/login/', this.form.value).subscribe(
        (response: any) => {  // If the request was successful
          console.log("Response from server: ", response);  // Log the response
          if (response && response.data && response.userId) {  // If the response has data and a userId
            this.authService.login(response.data, response.userId);  // Log the user in
            this.router.navigate(['/login-img-carousel']);  // Navigate to the '/login-img-carousel' route
          }
        },
        (error) => console.log(error)  // If an error occurred, log it
      );
    }
  }
}
