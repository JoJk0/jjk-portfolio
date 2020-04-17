import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';
import {
  animation, trigger, animateChild, group,
  transition, animate, style, query, AnimationBuilder
} from '@angular/animations';

@Directive({
  selector: '[animated]'
})
export class AnimatedDirective {

  constructor(private element: ElementRef, private _builder: AnimationBuilder) { }

  ngOnInit(){

    const el = this.element.nativeElement;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    };

    const myAnimation = this._builder.build([
      style({ opacity: 0 }),
      animate(500, style({ opacity: 1 }))
    ]);

    // use the returned factory object to create a player
    const player = myAnimation.create(el);
    player.play();

    //player.setPosition(0);
    //setTimeout(function(){
      console.log(player.totalTime);
    //}, 3000);

    el.observer = new IntersectionObserver(entry => {
      if (entry[0].intersectionRatio > 0) {
          
      } else {
          
      }
    }, observerOptions);
  }

    setPosition(p: number): void {
    const timeAtPosition = p * this.totalTime;
    this.players.forEach(player => {
      const position = player.totalTime ? Math.min(1, timeAtPosition / player.totalTime) : 1;
      player.setPosition(position);
    });
  }

  getPosition(): number {
    const longestPlayer = this.players.reduce((longestSoFar, player) => {
      const newPlayerIsLongest = player.totalTime > (longestSoFar !as AnimationPlayer).totalTime;
      if (longestSoFar === undefined || newPlayerIsLongest) {
        return player;
      } else {
        return longestSoFar;
      }
    }, undefined);
    return longestPlayer !== undefined ? longestPlayer.getPosition() / longestPlayer.totalTime : 0;
  }

}
