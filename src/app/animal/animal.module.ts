import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Animal {
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

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AnimalModule { }
