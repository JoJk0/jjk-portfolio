import { Injectable } from '@angular/core';
import { gsap } from 'gsap';
import { animation } from '@angular/animations';

export class ScrollGSAPService {

  public animationID: any;
  public intersectionRatio: number;
  public triggerHookDOM: HTMLElement;
  public animationStartDOM: HTMLElement;
  public animationEndDOM: HTMLElement;
  public debugBoxDOM: HTMLElement;

  private el: HTMLElement;
  private tween: any;
  private duration: number;
  private triggerHookStr: string;
  private offset: number;
  private debug: boolean;
  private origin: string;
  private timeline: any;
  private observer: IntersectionObserver;

  constructor(settings: any) { 
    this.el = settings.el;
    this.tween = settings.tween;
    this.duration = settings.duration;
    this.triggerHookStr = settings.triggerHook;
    this.offset = settings.offset;
    this.debug = settings.debug;
    this.origin = settings.origin;
  }

  animate(): void{
    
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px',
      threshold: this.generateTresholds(100)
    };

    this.timeline = gsap.timeline({ paused: true });
    this.animationID = this.el.id;

    this.timeline
      //.from(el, { opacity: 0, ease: 'none' })
      .add(this.tween);

      //console.log(timeline);

    this.observer = new IntersectionObserver(entry => {
      if(this.debug == true){
        this.intersectionRatio = entry[0].intersectionRatio;
      }
        if (entry[0].intersectionRatio > 0) {
            gsap.ticker.add(progressTween)
        } else {
            gsap.ticker.remove(progressTween)
        }
    }, observerOptions);
    
    if(this.debug == true){
      
      this.triggerHookDOM = document.createElement("div");
      this.animationStartDOM = document.createElement("div");
      this.animationEndDOM = document.createElement("div");

      this.debugBoxDOM = document.createElement("div");

      this.triggerHookDOM.id = "debug-trigger-hook-"+this.animationID;
      this.animationStartDOM.id = "animation-start-"+this.animationID;
      this.animationEndDOM.id = "animation-end-"+this.animationID;

      this.debugBoxDOM.id = "debug-box-"+this.animationID;

      this.triggerHookDOM.className = "debug-trigger-hook";
      this.animationStartDOM.className = "debug-animation-start";
      this.animationEndDOM.className = "debug-animation-end";
      this.debugBoxDOM.className = "debug-box";

      this.triggerHookDOM.innerHTML = "#"+this.animationID;
      this.animationStartDOM.innerHTML = "#"+this.animationID;
      this.animationEndDOM.innerHTML = "#"+this.animationID;

      document.body.prepend(this.triggerHookDOM); 
      document.body.prepend(this.animationStartDOM); 
      document.body.prepend(this.animationEndDOM); 

      document.body.prepend(this.debugBoxDOM); 

      //console.log(true);

    }

    let progressTween = () => {
      //console.log(window.scrollY);

        // Get scroll distance to bottom of viewport.
        // const scrollPosition = (window.scrollY + window.innerHeight);
        var triggerHook;
        switch(this.triggerHookStr){
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
        const elementPosTop = this.el.offsetTop;
        const elementPosBottom = elementPosTop+this.el.offsetHeight;

        let animationStart;
        let animationEnd;

        switch(this.origin){
          case 'top':
            animationStart = elementPosTop+this.offset;
            animationEnd = animationStart+this.duration;
            break;
          default:
            animationEnd = elementPosBottom+this.offset;
            animationStart = animationEnd-this.duration;
            break;
        }

        // Get element's position relative to bottom of viewport.
        const elRelativePositionTop = (triggerHook - animationStart);
        // Set desired duration.
        // const durationDistance = (window.innerHeight + el.offsetHeight);
        const durationDistance = this.duration;
        // Calculate tween progresss.
        const currentProgress = 
          this.duration == 0 ? 
            (triggerHook >= animationStart ? 1 : 0) : 
            ((elRelativePositionTop / durationDistance) > 1 ? 1 : (elRelativePositionTop / durationDistance < 0 ? 0 : elRelativePositionTop / durationDistance));
        // Set progress of gsap timeline.     
        // console.log("triggerHook: "+triggerHook);
        //console.log("elementPosTop: "+elementPosTop);
        // console.log("elementPosBottom: "+elementPosBottom);
        // console.log("animationStart: "+animationStart);

        if(this.debug == true){
          // console.log({
          //   ID: this.animationID,
          //   triggerHook: triggerHook,
          //   elementPosTop: elementPosTop,
          //   animationStart: animationStart,
          //   animationEnd: animationEnd,
          //   duration: this.duration,
          //   offset: this.offset,
          //   elRelativePositionTop: elRelativePositionTop,
          //   currentProgress: currentProgress
          // });

          this.debugBoxDOM.innerHTML = '<div class="container">\
            <div class="property"><div class="name">ID</div><div class="value">'+this.tween.targets()[0].nodeName+this.tween.targets()[0].id+'</div></div>\
            <div class="property"><div class="name">scrollContainer</div><div class="value">#'+this.animationID+'</div></div>\
            <div class="property"><div class="name">triggerHook</div><div class="value">'+triggerHook+'</div></div>\
            <div class="property"><div class="name">elementPosTop</div><div class="value">'+elementPosTop+'</div></div>\
            <div class="property"><div class="name">elementPosBottom</div><div class="value">'+elementPosBottom+'</div></div>\
            <div class="property"><div class="name">animationStart</div><div class="value">'+animationStart+'</div></div>\
            <div class="property"><div class="name">animationEnd</div><div class="value">'+animationEnd+'</div></div>\
            <div class="property"><div class="name">duration</div><div class="value">'+this.duration+'</div></div>\
            <div class="property"><div class="name">offset</div><div class="value">'+this.offset+'</div></div>\
            <div class="property"><div class="name">elRelativePosTop</div><div class="value">'+elRelativePositionTop+'</div></div>\
            <div class="property"><div class="name">currentProgress</div><div class="value">'+currentProgress+'</div></div>\
            <div class="property"><div class="name">intersectionRatio</div><div class="value">'+this.intersectionRatio+'</div></div>\
          </div>';
          this.triggerHookDOM.style.top = triggerHook+"px";
          this.animationStartDOM.style.top = animationStart+"px";
          this.animationEndDOM.style.top = animationEnd+"px";
          
        }
        this.timeline.progress(currentProgress);
    }

    progressTween();
    this.observer.observe(this.el);

  }

  public kill(){
    if(this.debug == true){
      document.body.removeChild(this.debugBoxDOM);
      document.body.removeChild(this.triggerHookDOM);
      document.body.removeChild(this.animationStartDOM);
      document.body.removeChild(this.animationEndDOM);
    }
    gsap.killTweensOf(this.tween.targets()[0]);
    this.timeline.kill();
    this.observer.unobserve(this.el);
  }

  private generateTresholds(numSteps): number[]{
    let thresholds = [];
  
    for (let i=0.0; i<=numSteps; i++) {
      let ratio = i/numSteps;
      thresholds.push(ratio);
    }

    return thresholds;
  }

}

/* ScrollGSAP Service  */
/* Copyright 2020 JJK operated under MIT License */