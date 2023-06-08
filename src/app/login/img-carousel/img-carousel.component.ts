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
  parentSubject: Subject<string> = new Subject();  // Subject that will emit events to its subscribers
  animals: Animal[] = [];  // Array to hold 'Animal' objects
  likedAnimals: Animal[] = [];  // Array to hold 'Animal' objects that are liked
  currentAnimal: Animal | null = null;  // Current animal object

  constructor(private http: HttpClient, private authService: AuthService) {  // Angular dependency injection to get the HttpClient and AuthService services
    this.getAnimals();  // Call to get the list of animals when component is created
  }

  // Method to make an HTTP GET request to get the list of animals
  getAnimals() {
    this.http.get<{data: Animal[], message: string}>('http://localhost:8080/api/animal/')  // The HTTP GET request
      .subscribe(response => {  // Subscribe to get the response
        this.animals = response.data;  // Store the list of animals in the 'animals' array
      });
  }

  // Method to handle card swipe animation and like action
  cardAnimation1(value: string) {
    this.parentSubject.next(value);  // Emit the event with the swipe direction

    // If there is a current animal
    if (this.currentAnimal) {
      // Set the headers for the request
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.currentToken);
      
      // Make the HTTP POST request to add the current animal to the liked list
      this.http.post(`http://localhost:8080/api/like/${this.currentAnimal.id}`, {}, { headers: headers })
        .subscribe(response => {
          // When the response is received
          this.likedAnimals.push(this.currentAnimal!);  // Add the current animal to the liked animals array
          console.log(response);  // Log the response
          this.animals = this.animals.filter(animal => animal.id !== this.currentAnimal!.id);  // Remove the liked animal from the list of animals
        });
    }
  }

  // Method to handle card swipe animation
  cardAnimation2(value: string) {
    this.parentSubject.next(value);  // Emit the event with the swipe direction
  }
}
