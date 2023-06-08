// with help from https://codepen.io/julessmiles/pen/yJqQKK
import { Component, Input, OnInit } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';
import { Animal } from '../../../app/animal/animal.module';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('cardAnimator', [
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))
    ])
  ]

})
export class CardComponent implements OnInit {

  @Input() parentSubject: Subject<string> = new Subject<string>();
  @Output() liked = new EventEmitter<Animal>();
  
  index = 0;
  animationState: string = '';
  likedAnimals: Animal[] = []; // an array to store liked animals
  @Input() animals: Animal[] = [];


  startAnimation(state: string) { 
    if (!this.animationState) {
      this.animationState = state;
      if (state === "swipeleft") {
        this.index++;
      }
      if (state === "swiperight") {
        let likedAnimal = this.animals[this.index];
        this.likedAnimals.push(likedAnimal);
        this.liked.emit(likedAnimal);
        this.index++;
      }
    }
  }
  

  resetAnimationState() {
    this.animationState = '';
  }

  ngOnInit() {
    this.parentSubject.subscribe(event => {
      this.startAnimation(event);
    });
  }

}