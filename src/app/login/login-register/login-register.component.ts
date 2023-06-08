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
  form: FormGroup;

  constructor(
    private http: HttpClient, 
    private authService: AuthService, 
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  register(): void {
    if (this.form.valid) {
      console.log(this.form.value);
      
      this.http.post('http://localhost:8080/auth/users/register/', this.form.value).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
          if (error.status === 409) {
            alert('This user already exists. Please try a different email.');
          } else {
            alert('An error occurred. Please try again later.');
          }
        }
      );
    }
  }
  

  login(): void {
  if (this.form.valid) {
    this.http.post('http://localhost:8080/auth/users/login/', this.form.value).subscribe(
      (response: any) => {
        console.log("Response from server: ", response);
        if (response && response.data && response.userId) { 
          this.authService.login(response.data, response.userId); 
          this.router.navigate(['/login-img-carousel']); 
        }
      },
      (error) => console.log(error)
    );
  }
}

  
  
}
