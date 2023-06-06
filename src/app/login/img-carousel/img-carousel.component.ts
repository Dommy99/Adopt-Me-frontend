// with help from https://codepen.io/julessmiles/pen/yJqQKK
import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../app/animal/animal.module';
import { Subject} from 'rxjs';
@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})
export class ImgCarouselComponent{
  parentSubject: Subject<string> = new Subject();
  animals: Animal[] = [];

  constructor(private http: HttpClient) {
    this.getAnimals();
  }

  getAnimals() {
    this.http.get<{data: Animal[], message: string}>('http://localhost:8080/api/animal/')
      .subscribe(response => {
        this.animals = response.data;
      });
  }


  cardAnimation(value: string) {
    this.parentSubject.next(value);
  }
}


