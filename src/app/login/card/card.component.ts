// with help from https://codepen.io/julessmiles/pen/yJqQKK
import { Component, Input, OnInit } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';
import { Animal } from '../../../app/animal/animal.module';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


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
  
  index = 0;
  animationState: string = '';
  likedAnimals: Animal[] = []; // an array to store liked animals
  @Input() animals: Animal[] = [];


  startAnimation(state: string) { // state needs to be of type string
    if (!this.animationState) {
      this.animationState = state;
      if (state === "swipeleft") {
        this.index++;
      }
      if (state === "swiperight") {
        this.likedAnimals.push(this.animals[this.index]);
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