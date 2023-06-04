import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-img-carousel',
  templateUrl: './login-img-carousel.component.html',
  styleUrls: ['./login-img-carousel.component.css']
})
export class LoginImgCarouselComponent implements OnInit {
  animal: any;

  constructor(private http: HttpClient){}

  ngOnInit(): void { 
    this.getAnimals();
  }

  getAnimals(): void {
    this.http
      .get('http://localhost:8080/api/animal/')
      .subscribe((response) => {
        console.log(response);
        this.animal = response;
      });
  }
}
