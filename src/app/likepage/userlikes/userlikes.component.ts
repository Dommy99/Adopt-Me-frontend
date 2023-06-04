import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Animal {
  id: number;
  name: string;
  gender: string;
  color: string;
  age: string;
  breed: string;
  species: string;
  img: string;
  adoption: {
    id: number;
    location: string;
    number: string;
    email: string;
    name: string;
  }
}

interface ApiResponse {
  data: Animal[];
  message: string;
}


@Component({
  selector: 'app-userlikes',
  templateUrl: './userlikes.component.html',
  styleUrls: ['./userlikes.component.css']
})

export class UserlikesComponent implements OnInit {
  animals: Animal[] = [];

  constructor(private http: HttpClient){}

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
}

