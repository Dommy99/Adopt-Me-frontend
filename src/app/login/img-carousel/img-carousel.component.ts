// img-carousel.component.ts
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../app/animal/animal.module';

interface ApiResponse {
  data: Animal[];
  message: string;
}

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})
export class ImgCarouselComponent implements OnInit {
  animals: Animal[] = [];
  @Output() activeAnimal = new EventEmitter<Animal>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAnimals();
  }

  getAnimals(): void {
    this.http
      .get<ApiResponse>('http://localhost:8080/api/animal/')
      .subscribe((response) => {
        console.log(response);
        this.animals = response.data;
      });
  }

  onSlideChange(slideEvent: any): void {
    const currentSlideIndex = slideEvent.current; 
    this.activeAnimal.emit(this.animals[currentSlideIndex]);
  }
}
