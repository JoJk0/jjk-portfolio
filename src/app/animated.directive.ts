import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output } from '@angular/core';


@Directive({
  selector: '[animated]'
})
export class AnimatedDirective {

  constructor(private element: ElementRef) { }

  ngOnInit(){

    const el = this.element.nativeElement;
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    };

    el.observer = new IntersectionObserver(entry => {
      if (entry[0].intersectionRatio > 0) {
          
      } else {
          
      }
    }, observerOptions);
  }

}
