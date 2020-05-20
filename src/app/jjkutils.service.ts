import { Injectable, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class JJKUtilsService {

  constructor() { }

  animateLetters(timeline: gsap.core.Timeline, el: ElementRef){
console.log("animating!");
  }

}
