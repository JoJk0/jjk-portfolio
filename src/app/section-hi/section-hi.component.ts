import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollGSAPService } from '../scroll-gsap.service';
import { JJKUtilsService } from '../jjkutils.service';

@Component({
  selector: 'app-section-hi',
  templateUrl: './section-hi.component.html',
  styleUrls: ['./section-hi.component.scss']
})
export class SectionHiComponent implements AfterViewInit {

  // Properties
  public bgPos = null;
  public bgWidth;
  public bgHeight;
  public logoPos: number = 0;
  public logoHeight: number = 0;
  public myNames: string[] = ["Jacob.", "Jakub.", "Kuba.", "jojko."];
  public currentNameVal: string = '';

  @ViewChild('hi') private _sectionHi: ElementRef;

  // Animated elements
  @ViewChild('scrollMouseSvg') scrollMouseSvg: ElementRef;
  @ViewChild('leftNavSocials') leftNavSocials: ElementRef;
  @ViewChild('logoSkeleton') logoSkeleton: ElementRef;
  @ViewChild('logoAnimated') logoAnimated: ElementRef;
  @ViewChild('head') textHeadEl: ElementRef;
  @ViewChild('intro') introEl: ElementRef;
  @ViewChild('introDesc') introDescEl: ElementRef;
  @ViewChild('hiBackground') hiBackgroundEl: ElementRef;
  @ViewChild('leftNav') leftNavEl: ElementRef;

  // Global timelines
  public logoTimeline = gsap.timeline({repeat: 0, delay: 1});

	private get sectionHi(): any {
		return this._sectionHi.nativeElement;
  }
  
  constructor(private detector: ChangeDetectorRef, private utils: JJKUtilsService) { 
    this.bgWidth = 5000;
    this.bgHeight = 1850;

    let bgPosX = window.innerWidth/2;
    let bgPosY = window.innerHeight-this.bgHeight/2;

    this.bgPos = {
      'background-position': `-${(bgPosX)}px -${(bgPosY)}px`
    }
  }

  ngAfterViewInit(): void {

    this.animateOnScroll();
    this.animateSection();

  }

  // moveBackground(e){
  //   let element = document.getElementById("hi");
  //   let x = element.style.backgroundPositionX.slice(0,-2);
  //   let y = element.style.backgroundPositionY.slice(0,-2);
  //   let currentPosX = parseInt(x);
  //   let currentPosY = parseInt(y);

  //   let change = 1;
  //   let newChangeX = e.movementX;
  //   let newChangeY = e.movementY; 

  //   let boundTop = 50;
  //   let boundBottom = 50;
  //   let boundLeft = 700;
  //   let boundRight = 700;

  //   console.log(newChangeY);
  //   if((currentPosY-newChangeY) >= -boundTop && newChangeY <= 0 || (currentPosY-newChangeY) <= window.innerHeight-this.bgHeight/1.5+boundBottom && newChangeY >= 0){
  //     newChangeY = 0;
  //   } else{
  //     newChangeY = newChangeY/10;
  //   }
  //   if((currentPosX-newChangeX) >= -boundLeft && newChangeX <= 0 || (currentPosX-newChangeX) <= window.innerWidth-this.bgWidth/1.5+boundRight && newChangeX >= 0){
  //     newChangeX = 0;
  //   } else{
  //     newChangeX = newChangeX/10;
  //   }
  //   // if(newChangeX >= 0){
  //   //   newChangeX = change;
  //   // } else{
  //   //   newChangeX = change*(-1);
  //   // }
  //   // if(newChangeY >= 0){
  //   //   newChangeY = change;
  //   // } else{
  //   //   newChangeY = change*(-1);
  //   // }

  //   let newPosX = currentPosX-newChangeX;
  //   let newPosY = currentPosY-newChangeY;

  //   this.bgPos = {
  //     //'background-position': `-${e.clientX}px -${e.clientY}px`
  //     'background-position': `${(newPosX)}px ${(newPosY)}px`
  //   }

  //   //console.log(this.bgPos);
  // }

  animateSection(): void{
    //console.log(this.scrollMouseSvg);
    this.animateScrollMouse();
    this.animateLogo();
    this.animateName();
  }

  // Scroll Mouse entry animation
  private animateScrollMouse(){

    let rect = this.scrollMouseSvg.nativeElement.children[0];
    let line = this.scrollMouseSvg.nativeElement.children[1];
    let linePos = line.getBoundingClientRect();
    let arrow = this.scrollMouseSvg.nativeElement.children[2];
    let arrowPos = arrow.getBoundingClientRect();

    // RECT ANIMATION
    let rectT = gsap.timeline({repeat: -1, yoyo: true, delay: 2});
    rectT.fromTo(rect, { transform: 'translateY(-1em)' }, { duration: 1.5, transform: 'translateY(0em)', ease: "power1.inOut" }, 0);

    // ARROW ANIMATION
    let timeline = gsap.timeline({repeat: -1, delay: 2});
    timeline
    // Appear
    .fromTo(line,                 {opacity: 0 }, { duration: 1, opacity: 0.33, ease: "expo.inOut" }, 0)
    .fromTo(arrow,                {opacity: 0 }, { duration: 1, opacity: 1, ease: "expo.inOut" }, 0)

    // Move down
    .fromTo(line,                 {height: "0em" }, { duration: 2, height: "8em", ease: "power1.in" }, 0)
    //.fromTo(arrow,                {transform: "translateY(-40em)" }, { duration: 3, transform: "translateY(0em)", ease: "expo.inOut" }, 0)

    // Disappear
    .fromTo(line,                 {opacity: 0.33 }, { duration: 2, opacity: 0, ease: "expo.inOut" }, 1)
    .fromTo(arrow,                {opacity: 1 }, { duration: 2, opacity: 0, ease: "expo.inOut" }, 1)
    
  }

  private animateLogo(){

    // Elements
    let mainRect = this.logoAnimated.nativeElement.children[0].children[0];
    let mainRectRect = mainRect.children[0];
    let mainRectRound = mainRect.children[1];
    let mainJUpper = this.logoAnimated.nativeElement.children[0].children[1];
    let mainJLower = this.logoAnimated.nativeElement.children[0].children[2];

    let secondaryRect = this.logoAnimated.nativeElement.children[0].children[3];
    let secondaryPoint = this.logoAnimated.nativeElement.children[0].children[4];
    let secondaryCircle = this.logoAnimated.nativeElement.children[0].children[5];

    // Set position
    let x = this.logoSkeleton.nativeElement.getBoundingClientRect().left;
    let height = this.logoSkeleton.nativeElement.getBoundingClientRect().bottom;
    setTimeout(() => {
      this.logoPos = x;
      this.logoHeight = height;
    }, 0);


    // MAIN INTRO TIMELINE
    let timeline = this.logoTimeline;
    timeline

    // Show me
    .set(this.logoAnimated.nativeElement, { left: window.innerWidth/2-this.logoAnimated.nativeElement.offsetWidth*2/2+'px' })
    .fromTo(this._sectionHi.nativeElement, { backgroundColor: 'rgba(0, 20, 39, 1)' }, { duration: 0.5, backgroundColor: 'rgba(0, 20, 39, 0)', ease: "linear.inOut" }, 2)

    // Rect - in
    .fromTo(mainRect, { bottom: mainRect.getBoundingClientRect().bottom+'em' }, { duration: 0.2, bottom: '6em', ease: "power1.in" }, 0)

    // Animate mainJ
    .fromTo(mainJLower.children[1], { strokeDashoffset: -148}, { duration: 0.5, strokeDashoffset: 0, ease: "power1.out" }, 0.2)
    .fromTo(mainJUpper, { transform: 'scale(0)'}, { duration: 0.5, transform: 'scale(1)', ease: "back(4).out" }, 1)

    // Rect - out
    .fromTo(mainRect, {  }, { duration: 0.5,  height: '0em', ease: "power2.out" }, 0.7)

    // SecondaryCircle
    .set(secondaryCircle, { opacity: 1 }, 0.5)
    .fromTo(secondaryCircle.children[1], { strokeDashoffset: 32}, { duration: 0.5, strokeDashoffset: -32, ease: "power1.out" }, 0.5)

    // SecondaryPoint
    .fromTo(secondaryPoint, { transform: 'scale(0)'}, { duration: 0.5, transform: 'scale(1)', ease: "back(4).out" }, 0.8)

    // SecondaryRect
    .fromTo(secondaryRect, { height: '0em'}, { duration: 0.5, height: '3em', ease: "power1.out" }, 1.2)

    // Logo - zoom out
    .fromTo(this.logoAnimated.nativeElement, { transform: 'scale(2)', left: window.innerWidth/2-this.logoAnimated.nativeElement.offsetWidth*2/2+'px' }, { duration: 0.7, transform: 'scale(1)', left: x+'px', ease: "power3.inOut" }, 1.7)

    // Show text
    .fromTo(this.introEl.nativeElement, { opacity: 0 }, { duration: 0.7, opacity: 1, ease: "power3.inOut" }, 1.7)
    .fromTo(this.introDescEl.nativeElement, { opacity: 0 }, { duration: 0.7, opacity: 1, ease: "power3.inOut" }, 1.7)

    // Show bars
    .set(this._sectionHi.nativeElement, { zIndex: 0 }, 2.5)
    .fromTo(this.leftNavEl.nativeElement, { opacity: 0 }, { duration: 0.5, opacity: 1, ease: "power3.inOut" }, 2)

    // BG MOVING TIMELINE
    let bgMoving = gsap.timeline({ repeat: -1, delay: 0, yoyo: true });
    //bgMoving.fromTo(this.hiBackgroundEl.nativeElement, { backgroundPosition: '58% bottom', backgroundSize: '240%' }, { duration: 60, backgroundPosition: '68% bottom', backgroundSize: '300%', ease: 'power1.inOut'}, 0);

  }

  private animateName(){

    let removeLetterTime: number = 0.1;
    let addLetterTime: number = 0.2;
    let waitTime: number = 3;

    // Blink cursor
    let timeline = gsap.timeline({repeat: -1, delay: 2});
    timeline.to(this.textHeadEl.nativeElement, { duration: 0.1, opacity: 1 }, 0.5)
    timeline.to(this.textHeadEl.nativeElement, { duration: 0.1, opacity: 0 }, 1);

    // Change names
    let changeNameTimeline = gsap.timeline({repeat: -1, delay: 1});
    this.myNames.forEach((name, no = 0) => {

      // Add new name
      for(let i=0; i<name.length; i++){
        changeNameTimeline.call(() => {
          this.currentNameVal = this.currentNameVal+name.charAt(i);
          //console.log("Printing '"+name.length+"'");
          this.detector.detectChanges();
        }, [], '+='+addLetterTime);
      }

      // Wait
      changeNameTimeline.call(() => {}, [], '+='+waitTime);

      // Remove old name
      let oldString: string = name;
      for(let i=0; i<oldString.length; i++){
        changeNameTimeline.call(() => {
          this.currentNameVal = this.currentNameVal.slice(0,-1);
          //console.log("Removing '"+this.currentNameVal.slice(0,-1)+"'");
          this.detector.detectChanges();
        }, [], '+='+removeLetterTime);
      }
      no++;
    });

  }

  private animateOnScroll(): void{

    // Elements
    let mainRect = this.logoAnimated.nativeElement.children[0].children[0];
    let mainRectRect = mainRect.children[0];
    let mainRectRound = mainRect.children[1];
    let mainJUpper = this.logoAnimated.nativeElement.children[0].children[1];
    let mainJLower = this.logoAnimated.nativeElement.children[0].children[2];

    let secondaryRect = this.logoAnimated.nativeElement.children[0].children[3];
    let secondaryPoint = this.logoAnimated.nativeElement.children[0].children[4];
    let secondaryCircle = this.logoAnimated.nativeElement.children[0].children[5];

    // LOGO SCROLL ANIMATION
    // SecondaryRect
    let secondaryRectTween = gsap.fromTo(secondaryRect, { height: '3em', ease: "power1.out" }, { height: '0em'});
    ScrollGSAPService.animate(this.sectionHi, secondaryRectTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.5), false, "top");

    // SecondaryPoint
    let secondaryPointTween = gsap.fromTo(secondaryPoint, { transform: 'scale(1)' }, { transform: 'scale(0)'});
    ScrollGSAPService.animate(this.sectionHi, secondaryPointTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.5), false, "top");

    // SecondaryCircle
    let secondaryCircleTween = gsap.fromTo(secondaryCircle.children[1], { strokeDashoffset: -32, ease: "power1.out" }, { strokeDashoffset: 32});
    ScrollGSAPService.animate(this.sectionHi, secondaryCircleTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.5), false, "top");
    // let secondaryCircleSet = gsap.fromTo(secondaryCircle, { opacity: 1 }, { opacity: 0 });
    let secondaryCircleSet = gsap.to(secondaryCircle, { opacity: 0 });
    ScrollGSAPService.animate(this.sectionHi, secondaryCircleSet, 0, "center", window.innerHeight*(0.75), false, "top"); 

    // MainJUpper (point)
    let mainJUpperTween = gsap.fromTo(mainJUpper, { transform: 'scale(1)' }, { transform: 'scale(0)' });
    ScrollGSAPService.animate(this.sectionHi, mainJUpperTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.5), false, "top"); 

    // Rect - in
    // let rectInTween = gsap.fromTo(mainRect, { height: '0em', ease: "power2.in" }, { height: 'auto' });
    let rectInTween = gsap.to(mainRect, { height: 'auto' });
    ScrollGSAPService.animate(this.sectionHi, rectInTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.75), false, "top"); 

    // Animate mainJ
    let mainJTween = gsap.fromTo(mainJLower.children[1], { strokeDashoffset: 0 }, { strokeDashoffset: -148});
    ScrollGSAPService.animate(this.sectionHi, mainJTween, window.innerHeight*(0.10), "center", window.innerHeight*(0.85), false, "top"); 
    //let mainJSet = gsap.to(mainJLower, { opacity: 0 });
    //ScrollGSAPService.animate(this.sectionHi, mainJSet, 0, "center", window.innerHeight*(0.75), false, "top"); 

    // Rect - out
    // let rectOutTween = gsap.fromTo(mainRect, { bottom: '6em', ease: "power1.out" }, { bottom: mainRect.getBoundingClientRect().bottom+'em' })
    let rectOutTween = gsap.to(mainRect, { bottom: mainRect.getBoundingClientRect().bottom+'em' })
    ScrollGSAPService.animate(this.sectionHi, rectOutTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.95), false, "top"); 

    // BG ANIMATION
    let bgTween = gsap.fromTo(this.hiBackgroundEl.nativeElement, { opacity: 1, backgroundSize: '240%', backgroundPositionY: 'bottom' }, { opacity: 0, backgroundSize: '230%', backgroundPositionY: '95%' });
    ScrollGSAPService.animate(this.sectionHi, bgTween, window.innerHeight*(0.5), "center", window.innerHeight*(0.5), false, "top"); 

    // TEXT ANIMATION
    // Main intro
    let textTitleTween = gsap.fromTo(this.introEl.nativeElement, { width: 'auto' }, { width: '0' });
    ScrollGSAPService.animate(this.sectionHi, textTitleTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.75), false, "top"); 

    // Desc intro 1
    let textDesc1Tween = gsap.fromTo(this.introDescEl.nativeElement.children[0], { width: 'auto' }, { width: '0' });
    ScrollGSAPService.animate(this.sectionHi, textDesc1Tween, window.innerHeight*(0.25), "center", window.innerHeight*(0.65), false, "top"); 

    // Desc intro 2
    let textDesc2Tween = gsap.fromTo(this.introDescEl.nativeElement.children[1], { width: 'auto' }, { width: '0' });
    ScrollGSAPService.animate(this.sectionHi, textDesc2Tween, window.innerHeight*(0.25), "center", window.innerHeight*(0.5), false, "top"); 

    // LEFT MENU ANIMATION
    // Scroll Mouse
    let scrollMouseTween = gsap.fromTo(this.scrollMouseSvg.nativeElement, { transform: 'translateY(0em)', opacity: 1 }, { transform: 'translateY(-3em)', opacity: 0 });
    ScrollGSAPService.animate(this.sectionHi, scrollMouseTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.5), false, "top"); 

    // Social Medias
    let socialsTween = gsap.fromTo(this.leftNavSocials.nativeElement, { transform: 'translateY(0em)', opacity: 1 }, { transform: 'translateY(3em)', opacity: 0 });
    ScrollGSAPService.animate(this.sectionHi, socialsTween, window.innerHeight*(0.25), "center", window.innerHeight*(0.75), false, "top"); 

  }

//   private drawScrollMouse(){

//     this.pixiApp.loader.load((loader, resources) => {
//       let rectTex = PIXI.Texture.from('../../assets/scroll-mouse.svg/rect.svg');
//       let rectSpr = new PIXI.Sprite(rectTex);

//     });
//     this.ctx = this.scrollMouseCanvas.nativeElement.getContext('2d');
//     // Rect
//     let rect1 = new Path2D("M60.5,6L60.5,6C90.6,6,115,30.4,115,60.5v96.7c0,30.1-24.4,54.5-54.5,54.5l0,0C30.4,211.6,6,187.2,6,157.2\
// V60.5C6,30.4,30.4,6,60.5,6z");
    
//     let rect2 = new Path2D("M60.9,32.6L60.9,32.6c2.8,0,5.1,2.3,5.1,5.1v20.7c0,2.8-2.3,5.1-5.1,5.1l0,0c-2.8,0-5.1-2.3-5.1-5.1V37.7\
//     C55.8,34.9,58.1,32.6,60.9,32.6z");

//     // Arrow-down
//     let arrow1 = new Path2D("M92.3 1146.3, L60.9 1177.7");
//     let arrow2 = new Path2D("M28.8 1146.3, L60.1 1177.7");

//     // Line
//     let line = new Path2D("M60.9 293.2, L60.9 1060.6");

//     // Construct
//     this.ctx.strokeStyle = "#C5FFFE";
//     this.ctx.lineWidth = 12;
//     this.ctx.stroke(rect1);

//     this.ctx.fillStyle = "#C5FFFE";
//     this.ctx.lineWidth = 3;
//     this.ctx.fill(rect2);

//     this.ctx.fillStyle = null;
//     this.ctx.lineWidth = 12;
//     this.ctx.lineCap = "round";
//     this.ctx.lineJoin = "round";
//     this.ctx.stroke(arrow1);
//     this.ctx.stroke(arrow2);

//     this.ctx.globalAlpha = 0.33;
//     this.ctx.lineWidth = 8;
//     this.ctx.stroke(line);

//     this.animateScrollMouse();

//   }
}
