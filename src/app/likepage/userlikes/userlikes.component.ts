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

export class UserlikesComponent implements OnInit, OnDestroy {
  animals: Animal[] = [];
  private userId!: number;
  private subscription!: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  ngOnInit(): void { 
    this.subscription = this.authService.userId.subscribe(userId => {
      if (userId !== null) {
        this.userId = userId;
        this.getAnimals();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getAnimals(): void {
    if (this.userId) {
      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`
    });
    
      this.http
        .get<{data: Animal[], message: string}>(`http://localhost:8080/api/user/${this.userId}/likes`, { headers: headers })
        .subscribe(
          (response) => {
            console.log(response);
            this.animals = response.data;
            console.log('Animals: ', this.animals);
          },
          (error) => {
            console.error('Error:', error);
          }
        );
        
    }
  }

//   async getAnimals(): Promise<void> {
//     if (this.userId) {
//         let headers = new HttpHeaders({
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${this.authService.getToken()}`
//         });
//         try {
//             const response = await this.http
//             .get<{data: Animal[], message: string}>(`http://localhost:8080/api/user/${this.userId}/likes`, { headers: headers })
//             .toPromise();
//             if (response) {
//                 console.log(response);
//                 this.animals = response.data;
//                 console.log('Animals: ', this.animals);
//             } else {
//                 console.error('No response from the server');
//             }
//         } catch(error) {
//             console.error('Error:', error);
//         }
//     }
// }


  removeAnimal(id: number): void {
    this.http.delete(`http://localhost:8080/api/like/${id}`).subscribe(response => {
      this.getAnimals();
    });
  }

  onAnimalLiked(animal: Animal) {
    this.animals.push(animal);
  }
  
}

