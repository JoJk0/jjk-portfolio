import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollGSAPService } from '../scroll-gsap.service';

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

  // Animated elements
  @ViewChild('scrollMouseSvg') scrollMouseSvg: ElementRef;

	private get sectionHi(): any {
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
    
    let tween = gsap.to(this.sectionHi, { opacity: 0, ease: 'power2.out' });
    ScrollGSAPService.animate(this.sectionHi, tween, window.innerHeight/2, "center", 0);
    this.animateSection();
    this.animateJ();

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

  animateSection(): void{
    console.log(this.scrollMouseSvg);
    this.animateScrollMouse();
  }

  // Scroll Mouse entry animation
  private animateScrollMouse(){

    let line = this.scrollMouseSvg.nativeElement.children[1].children[2].children[0];
    let arrow = this.scrollMouseSvg.nativeElement.children[1].children[1];

    let timeline = gsap.timeline({repeat: -1, delay: 2});

    // Pre-set opacity
    timeline
    // Appear
    .fromTo(line,                 {opacity: 0 }, { duration: 1, opacity: 0.33, ease: "expo.inOut" }, 0)
    .fromTo(arrow.children[0],    {opacity: 0 }, { duration: 1, opacity: 1, ease: "expo.inOut" }, 0)
    .fromTo(arrow.children[1],    {opacity: 0 }, { duration: 1, opacity: 1, ease: "expo.inOut" }, 0)
    // Move down
    .fromTo(line,                 {attr: { y2: 293.2 } }, { duration: 3, attr: { y2: 1060.6 }, ease: "expo.inOut" }, 0)
    .fromTo(arrow.children[0],    {attr: { y1: 293.2, y2: 324.6 } }, { duration: 3, attr: { y1: 1146.3, y2: 1177.7 }, ease: "expo.inOut" }, 0)
    .fromTo(arrow.children[1],    {attr: { y1: 293.2, y2: 324.6 } }, { duration: 3, attr: { y1: 1146.3, y2: 1177.7 }, ease: "expo.inOut" }, 0)
    // Disappear
    .fromTo(line,                 {opacity: 0.33 }, { duration: 3, opacity: 0, ease: "expo.inOut" }, 2)
    .fromTo(arrow.children[0],    {opacity: 1 }, { duration: 3, opacity: 0, ease: "expo.inOut" }, 2)
    .fromTo(arrow.children[1],    {opacity: 1 }, { duration: 3, opacity: 0, ease: "expo.inOut" }, 2);
    
  }

  private animateJ(){

  }
}
