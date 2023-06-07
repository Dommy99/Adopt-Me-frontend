import { Component} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../../../app/animal/animal.module';
import { Subject} from 'rxjs';
import { AuthService } from '../../../app/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-img-carousel',
  templateUrl: './img-carousel.component.html',
  styleUrls: ['./img-carousel.component.css']
})
export class ImgCarouselComponent{
  parentSubject: Subject<string> = new Subject();
  animals: Animal[] = [];
  private userId!: number;
  private subscription!: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.subscription = this.authService.userId.subscribe(userId => {
      if (userId !== null) {
        this.userId = userId;
        this.getAnimals();
      }
    });
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

  likeAnimal(id: number): void {
    if(this.userId) {
      this.http.post(`http://localhost:8080/api/like/${id}`, {userId: this.userId}).subscribe(response => {
        this.getAnimals();
      });
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
