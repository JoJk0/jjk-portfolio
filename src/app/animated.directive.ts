import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Directive({
  selector: '[animated]'
})
export class AnimatedDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit(){ 

    const el = this.element.nativeElement;
    console.log("anim");

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    };

    el.tl = gsap.timeline({ paused: true });

    el.tl
      .to(el, { opacity: 1, ease: 'power2.inOut' })
      .to(el, { opacity: 0, ease: 'power1.inOut' });

    el.observer = new IntersectionObserver(entry => {
        if (entry[0].intersectionRatio > 0) {
            gsap.ticker.add(el.progressTween)
        } else {
            gsap.ticker.remove(el.progressTween)
        }
    }, observerOptions);

    el.progressTween = () => {
        // Get scroll distance to bottom of viewport.
        const scrollPosition = (window.scrollY + window.innerHeight);
        // Get element's position relative to bottom of viewport.
        const elPosition = (scrollPosition - el.offsetTop);
        // Set desired duration.
        const durationDistance = (window.innerHeight + el.offsetHeight);
        // Calculate tween progresss.
        const currentProgress = (elPosition / durationDistance);
        // Set progress of gsap timeline.     
        el.tl.progress(currentProgress);
    }

    el.observer.observe(el);
  }

}
