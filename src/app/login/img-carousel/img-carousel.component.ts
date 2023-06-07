import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../app/animal/animal.module';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})
export class ImgCarouselComponent {
  parentSubject: Subject<string> = new Subject();
  animals: Animal[] = [];
  likedAnimals: Animal[] = [];
  

  constructor(private http: HttpClient) {
    this.getAnimals();
  }

  getAnimals() {
    this.http.get<{data: Animal[], message: string}>('http://localhost:8080/api/animal/')
      .subscribe(response => {
        this.animals = response.data;
      });
  }

  cardAnimation1(value: string,animal: Animal) {
    this.parentSubject.next(value);
    this.http.post(`http://localhost:8080/api/like/${animal.id}`, {}).subscribe(response => {
      this.likedAnimals.push(animal);
      console.log(response);
      
    });
  }
  cardAnimation2(value: string) {
    this.parentSubject.next(value);
  }

  // likeAnimal(animal: Animal): void {
  //   this.http.post(`http://localhost:8080/api/like/${animal.id}`, {}).subscribe(response => {
  //     this.likedAnimals.push(animal);
  //     console.log(response);
      
  //   });
  // }
}
