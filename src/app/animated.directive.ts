import { Directive, ElementRef, EventEmitter, Input, OnInit, OnDestroy, Output, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollGSAPService } from './scroll-gsap.service';

@Directive({
  selector: '[animated]'
})
export class AnimatedDirective implements AfterViewInit {

  constructor(private element: ElementRef) { }

  ngAfterViewInit(){ 

    let tween = gsap.to(this.element.nativeElement, { opacity: 0, ease: 'power2.out' });
    ScrollGSAPService.animate(this.element.nativeElement, tween, window.innerHeight/2, 0);

    let tween2 = gsap.to(this.element.nativeElement, { opacity: 1, ease: 'power2.in' });
    ScrollGSAPService.animate(this.element.nativeElement, tween2, window.innerHeight/2, window.innerHeight/2);

    // const el = this.element.nativeElement;

    // const observerOptions = {
    //   root: null,
    //   rootMargin: '0px 0px',
    //   threshold: 0
    // };

    // el.tl = gsap.timeline({ paused: true });

    // el.tl
    //   //.from(el, { opacity: 0, ease: 'none' })
    //   .to(el, { opacity: 0, ease: 'none' });

    // el.observer = new IntersectionObserver(entry => {
    //     if (entry[0].intersectionRatio > 0) {
    //         gsap.ticker.add(el.progressTween)
    //     } else {
    //         gsap.ticker.remove(el.progressTween)
    //     }
    // }, observerOptions);

    // el.progressTween = () => {
    //     // Get scroll distance to bottom of viewport.
    //     // const scrollPosition = (window.scrollY + window.innerHeight);
    //     const scrollPosition = (window.scrollY);
    //     // Get element's position relative to bottom of viewport.
    //     const elPosition = (scrollPosition - el.offsetTop);
    //     // Set desired duration.
    //     // const durationDistance = (window.innerHeight + el.offsetHeight);
    //     const durationDistance = 200;
    //     // Calculate tween progresss.
    //     const currentProgress = (elPosition / durationDistance);
    //     // Set progress of gsap timeline.     
    //     el.tl.progress(currentProgress);
    // }

    // el.observer.observe(el);
  }

}
