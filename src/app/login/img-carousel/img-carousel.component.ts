import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../app/animal/animal.module';
import { Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../../app/auth.service';

@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})
export class ImgCarouselComponent {
  parentSubject: Subject<string> = new Subject();
  animals: Animal[] = [];
  likedAnimals: Animal[] = [];
  currentAnimal: Animal | null = null;


  

  constructor(private http: HttpClient, private authService: AuthService) {
    this.getAnimals();
  }
  

  getAnimals() {
    this.http.get<{data: Animal[], message: string}>('http://localhost:8080/api/animal/')
      .subscribe(response => {
        this.animals = response.data;
      });
  }
  // private headers = new HttpHeaders().set('Authorization', 'Bearer ' +'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTY4NjE3NTgwMCwiZXhwIjoxNjg2MjYyMjAwfQ.66bMCM5UlpNMzrqxcIeBuLaetelGRkh3yMpdqk2tJmE' );

  cardAnimation1(value: string) {
    this.parentSubject.next(value);
    if (this.currentAnimal) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.currentToken);
      this.http.post(`http://localhost:8080/api/like/${this.currentAnimal.id}`, {}, { headers: headers })
        .subscribe(response => {
          this.likedAnimals.push(this.currentAnimal!);
          console.log(response);
        });
    }
  }
  

  // cardAnimation1(value: string) {
  //   this.parentSubject.next(value);
  //   if (this.currentAnimal) {
  //     this.http.post(`http://localhost:8080/api/like/${this.currentAnimal.id}`, {}).subscribe(response => {
  //       this.likedAnimals.push(this.currentAnimal!);
  //       console.log(response);
  //     });
  //   }
  // }
  
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
