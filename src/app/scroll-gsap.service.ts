import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class ScrollGSAPService {

  constructor() { }

  static animate(el: HTMLElement, tween: GSAPTween, duration: number, triggerPos: number): void{

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    };

    let timeline = gsap.timeline({ paused: true });

    timeline
      //.from(el, { opacity: 0, ease: 'none' })
      .add(tween);

    let observer = new IntersectionObserver(entry => {
        if (entry[0].intersectionRatio >= 0) {
            gsap.ticker.add(progressTween)
        } else {
            gsap.ticker.remove(progressTween)
        }
    }, observerOptions);

    let progressTween = () => {
        // Get scroll distance to bottom of viewport.
        // const scrollPosition = (window.scrollY + window.innerHeight);
        const scrollPosition = (window.scrollY + triggerPos);
        // Get element's position relative to bottom of viewport.
        const elPosition = (scrollPosition - el.offsetTop);
        // Set desired duration.
        // const durationDistance = (window.innerHeight + el.offsetHeight);
        const durationDistance = duration;
        // Calculate tween progresss.
        const currentProgress = (elPosition / durationDistance);
        // Set progress of gsap timeline.     
        timeline.progress(currentProgress);
    }

    observer.observe(el);

  }

}

/* ScrollGSAP Service  */
/* Copyright 2020 JJK operated under MIT License */