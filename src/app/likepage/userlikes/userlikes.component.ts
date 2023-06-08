import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../app/auth.service';
import { Animal } from '../../../app/animal/animal.module';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-userlikes',  
  templateUrl: './userlikes.component.html',
  styleUrls: ['./userlikes.component.css']
})

// Component logic
export class UserlikesComponent implements OnInit, OnDestroy {
  animals: Animal[] = [];  // Array to hold 'Animal' objects fetched from the API
  private userId!: number;  // Variable to store the current user's id
  private subscription!: Subscription;  // Subscription object to handle observables

  // Constructor function - called when the component is initialized
  constructor(
    private http: HttpClient,  // Injecting the HttpClient module to handle http requests
    private authService: AuthService  // Injecting the AuthService to handle user authorization
  ) { }

  // ngOnInit() - a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
  ngOnInit(): void { 
    // Subscribing to the userId observable from the AuthService
    // This will run the provided function every time the userId value changes
    this.subscription = this.authService.userId.subscribe(userId => {
      if (userId !== null) {
        this.userId = userId;  // Storing the user id
        this.getAnimals();  // Fetching the liked animals for the user
      }
    });
  }

  // ngOnDestroy() - a lifecycle hook that is called just before Angular destroys the directive/component
  ngOnDestroy(): void {
    this.subscription.unsubscribe();  // Unsubscribing from the observable to prevent memory leaks
  }

  // Function to fetch the liked animals for the current user
  getAnimals(): void {
    if (this.userId) {
      // Setting up headers for the http request
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`  // Adding the user's token for authentication
      });
    
      // Making a GET request to the API to fetch the liked animals
      this.http
        .get<{data: Animal[], message: string}>(`http://localhost:8080/api/user/${this.userId}/likes`, { headers: headers })
        .subscribe(
          (response) => {  // Function to run when the request is successful
            console.log(response);  // Logging the response to the console
            this.animals = response.data;  // Storing the fetched animals
            console.log('Animals: ', this.animals);  // Logging the fetched animals to the console
          },
          (error) => {  // Function to run when the request fails
            console.error('Error:', error);  // Logging the error to the console
          }
        );
    }
  }

  // Function to remove a liked animal for the user
  removeAnimal(id: number): void {
    // Setting up headers for the http request
    let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`  // Adding the user's token for authentication
    });

    // Making a DELETE request to the API to remove the liked animal
    this.http.delete(`http://localhost:8080/api/like/${id}`, { headers: headers })
        .subscribe(response => {
            this.getAnimals();  // Refreshing the list of liked animals
        },
        (error) => {  // Function to run when the request fails
            console.error('Error:', error);  // Logging the error to the console
        });
  }

  // Function to add a liked animal to the list
  onAnimalLiked(animal: Animal) {
    this.animals.push(animal);
  }
  
}
