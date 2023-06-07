// login-img-carousel.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../app/animal/animal.module';

@Component({
  selector: 'app-login-img-carousel',
  templateUrl: './login-img-carousel.component.html',
  styleUrls: ['./login-img-carousel.component.css']
})
export class LoginImgCarouselComponent{
  // currentAnimal: Animal | null = null;

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void { 
  // }

  // onActiveAnimalChanged(newAnimal: Animal): void {
  //   this.currentAnimal = newAnimal;
  // }
}
