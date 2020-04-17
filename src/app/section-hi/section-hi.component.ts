import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-section-hi',
  templateUrl: './section-hi.component.html',
  styleUrls: ['./section-hi.component.scss']
})
export class SectionHiComponent implements AfterViewInit {

  public bgPos = null;
  public bgWidth;
  public bgHeight;

  @ViewChild('hi')
	private _sectionHi: ElementRef;

	private get sectionHi(): HTMLElement {
		return this._sectionHi.nativeElement;
  }
  
  constructor() { 
    this.bgWidth = 5000;
    this.bgHeight = 1850;

    let bgPosX = window.innerWidth/2;
    let bgPosY = window.innerHeight-this.bgHeight/2;

    this.bgPos = {
      'background-position': `-${(bgPosX)}px -${(bgPosY)}px`
    }
  }

  ngAfterViewInit(): void {
    
    // const observerOptions = {
    //   root: null,
    //   rootMargin: '0px 0px',
    //   threshold: 0
    // };

    // let timeline = gsap.timeline({ paused: true });
    // timeline
    //   .to(this.sectionHi, { opacity: 1, ease: 'power2.inOut' })
    //   .to(this.sectionHi, { opacity: 0, ease: 'power1.inOut' });

    // let observer = new IntersectionObserver(entry => {
    //     if (entry[0].intersectionRatio > 0) {
    //         gsap.ticker.add(progressTween)
    //     } else {
    //         gsap.ticker.remove(progressTween)
    //     }
    // }, observerOptions);

    // let progressTween = () => {
    //     // Get scroll distance to bottom of viewport.
    //     const scrollPosition = (window.scrollY + window.innerHeight);
    //     // Get element's position relative to bottom of viewport.
    //     const elPosition = (scrollPosition - this.sectionHi.offsetTop);
    //     // Set desired duration.
    //     const durationDistance = (window.innerHeight + this.sectionHi.offsetHeight);
    //     // Calculate tween progresss.
    //     const currentProgress = (elPosition / durationDistance);
    //     // Set progress of gsap timeline.     
    //     timeline.progress(currentProgress);
    // }

    // observer.observe(this.sectionHi);

  }

  moveBackground(e){
    let element = document.getElementById("hi");
    let x = element.style.backgroundPositionX.slice(0,-2);
    let y = element.style.backgroundPositionY.slice(0,-2);
    let currentPosX = parseInt(x);
    let currentPosY = parseInt(y);

    let change = 1;
    let newChangeX = e.movementX;
    let newChangeY = e.movementY;

    let boundTop = 50;
    let boundBottom = 50;
    let boundLeft = 700;
    let boundRight = 700;

    console.log(newChangeY);
    if((currentPosY-newChangeY) >= -boundTop && newChangeY <= 0 || (currentPosY-newChangeY) <= window.innerHeight-this.bgHeight/1.5+boundBottom && newChangeY >= 0){
      newChangeY = 0;
    } else{
      newChangeY = newChangeY/10;
    }
    if((currentPosX-newChangeX) >= -boundLeft && newChangeX <= 0 || (currentPosX-newChangeX) <= window.innerWidth-this.bgWidth/1.5+boundRight && newChangeX >= 0){
      newChangeX = 0;
    } else{
      newChangeX = newChangeX/10;
    }
    // if(newChangeX >= 0){
    //   newChangeX = change;
    // } else{
    //   newChangeX = change*(-1);
    // }
    // if(newChangeY >= 0){
    //   newChangeY = change;
    // } else{
    //   newChangeY = change*(-1);
    // }

    let newPosX = currentPosX-newChangeX;
    let newPosY = currentPosY-newChangeY;

    this.bgPos = {
      //'background-position': `-${e.clientX}px -${e.clientY}px`
      'background-position': `${(newPosX)}px ${(newPosY)}px`
    }

    //console.log(this.bgPos);
  }

}
