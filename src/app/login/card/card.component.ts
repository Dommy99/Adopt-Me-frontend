import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { trigger, keyframes, animate, transition } from "@angular/animations";
import * as kf from './keyframes';  
import { Animal } from '../../../app/animal/animal.module'; 
import { Subject } from 'rxjs';

@Component({
  selector: 'app-card', 
  templateUrl: './card.component.html',  
  styleUrls: ['./card.component.css'],
  animations: [  // Define animations for this component
    trigger('cardAnimator', [  // Define a trigger for the animations
      transition('* => swiperight', animate(750, keyframes(kf.swiperight))),  // Define transition and animation when swiping right
      transition('* => swipeleft', animate(750, keyframes(kf.swipeleft)))  // Define transition and animation when swiping left
    ])
  ]
})

export class CardComponent implements OnInit {

  @Input() parentSubject: Subject<string> = new Subject<string>();  // An input property that takes a Subject<string> type
  @Output() liked = new EventEmitter<Animal>();  // An output property that emits events when an animal is liked

  index = 0;  // Variable to keep track of current index in the animal array
  animationState: string = '';  // State of the animation
  likedAnimals: Animal[] = [];  // Array to hold 'Animal' objects that are liked
  @Input() animals: Animal[] = [];  // An input property that takes an array of 'Animal' objects

  // Method to start the swipe animation
  startAnimation(state: string) {
    if (!this.animationState) {
      this.animationState = state;  // Updating the animation state

      if (state === "swipeleft") {
        this.index++;  // Increment the index if swipe left
      }

      if (state === "swiperight") {
        let likedAnimal = this.animals[this.index];  // Get the liked animal
        this.likedAnimals.push(likedAnimal);  // Add it to the likedAnimals array
        this.liked.emit(likedAnimal);  // Emit the liked event
        this.index++;  // Increment the index if swipe right
      }
    }
  }

  // Method to reset the animation state
  resetAnimationState() {
    this.animationState = '';
  }

  // ngOnInit() - a lifecycle hook that is called after Angular has initialized all data-bound properties of a directive
  ngOnInit() {
    // Subscribe to the parentSubject observable to start the animation when an event occurs
    this.parentSubject.subscribe(event => {
      this.startAnimation(event);
    });
  }

}
