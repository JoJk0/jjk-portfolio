import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({
  providedIn: 'root'
})
export class ScrollGSAPService {

  constructor() { }

  static animate(el: HTMLElement, tween: any, duration: number, triggerHookStr: string, offset: number, debug = false, origin: string = 'bottom'): void{
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: 0
    };

    let timeline = gsap.timeline({ paused: true });
    let animationID = el.id;

    timeline
      //.from(el, { opacity: 0, ease: 'none' })
      .add(tween);

      console.log(timeline);

    let observer = new IntersectionObserver(entry => {
        if (entry[0].intersectionRatio >= 0) {
            gsap.ticker.add(progressTween)
        } else {
            gsap.ticker.remove(progressTween)
        }
    }, observerOptions);
    
    if(debug == true){
      
      var triggerHookDOM = document.createElement("div");
      var animationStartDOM = document.createElement("div");
      var animationEndDOM = document.createElement("div");

      triggerHookDOM.id = "debug-trigger-hook-"+animationID;
      animationStartDOM.id = "animation-start-"+animationID;
      animationEndDOM.id = "animation-end-"+animationID;

      triggerHookDOM.className = "debug-trigger-hook";
      animationStartDOM.className = "debug-animation-start";
      animationEndDOM.className = "debug-animation-end";

      triggerHookDOM.innerHTML = "#"+animationID;
      animationStartDOM.innerHTML = "#"+animationID;
      animationEndDOM.innerHTML = "#"+animationID;

      document.body.prepend(triggerHookDOM); 
      document.body.prepend(animationStartDOM); 
      document.body.prepend(animationEndDOM); 

      console.log(true);

    }

    let progressTween = () => {
      //console.log(window.scrollY);

        // Get scroll distance to bottom of viewport.
        // const scrollPosition = (window.scrollY + window.innerHeight);
        var triggerHook;
        switch(triggerHookStr){
          case "top":
            triggerHook = window.scrollY;
            break;
          case "center":
            triggerHook = window.scrollY + (window.innerHeight/2);
            break;
          case "bottom":
            triggerHook = window.scrollY + window.innerHeight;
            break;
          default:
            triggerHook = window.scrollY;
            break;
        }
        const elementPosTop = el.offsetTop;
        const elementPosBottom = elementPosTop+el.offsetHeight;

        let animationStart;
        let animationEnd;

        switch(origin){
          case 'top':
            animationStart = elementPosTop+offset;
            animationEnd = animationStart+duration;
            break;
          default:
            animationEnd = elementPosBottom+offset;
            animationStart = animationEnd-duration;
            break;
        }

        // Get element's position relative to bottom of viewport.
        const elRelativePositionTop = (triggerHook - animationStart);
        // Set desired duration.
        // const durationDistance = (window.innerHeight + el.offsetHeight);
        const durationDistance = duration;
        // Calculate tween progresss.
        const currentProgress = (elRelativePositionTop / durationDistance);
        // Set progress of gsap timeline.     
        // console.log("triggerHook: "+triggerHook);
        //console.log("elementPosTop: "+elementPosTop);
        // console.log("elementPosBottom: "+elementPosBottom);
        // console.log("animationStart: "+animationStart);
        // console.log("currentProgress: "+currentProgress);
        if(debug == true){

          triggerHookDOM.style.top = triggerHook+"px";
          animationStartDOM.style.top = animationStart+"px";
          animationEndDOM.style.top = animationEnd+"px";
          
        }
        timeline.progress(currentProgress);
    }

    observer.observe(el);

  }

}

/* ScrollGSAP Service  */
/* Copyright 2020 JJK operated under MIT License */