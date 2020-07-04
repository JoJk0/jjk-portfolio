import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef, HostListener, Output, EventEmitter, Input, QueryList } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollGSAPService } from '../scroll-gsap.service';
import { JJKUtilsService } from '../jjkutils.service';
import { globals } from '../app.component';
import { CallService } from '../call.service';
import { Subscription } from 'rxjs';
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-section-hi',
  templateUrl: './section-hi.component.html',
  styleUrls: ['./section-hi.component.scss']
})
export class SectionHiComponent implements AfterViewInit {

  @Input() skeletons: QueryList<ElementRef>;
  @Input() skeletonsLoaded: boolean;

  // public bgPos = null;
  public logoPos: number = 0;
  public logoHeight: number = 0;
  public myNames: string[] = ["Jacob.", "Jakub.", "Kuba.", "jojko."];
  public currentNameVal: string = '';
  public scrollTweens: ScrollGSAPService[] = [];
  public classicTweens: any[] = [];
  public skeleton: ElementRef;

  // Private properties
  private primaryCircle = { 
    strokeDashOffset: {
      from: 0,
      to: 0
    }
  };
  private secondaryCircle = { 
    strokeDashOffset: {
      from: 0,
      to: 0
    }
  };


  // Device-dependent properties
  public backgroundSize: number;

  @ViewChild('hi') private _sectionHi: ElementRef;

  // Animated elements
  @ViewChild('scrollMouseSvg') scrollMouseSvg: ElementRef;
  @ViewChild('scrollTouch') scrollTouchEl: ElementRef;
  @ViewChild('leftNavSocials') leftNavSocials: ElementRef;
  @ViewChild('logoSkeleton') logoSkeleton: ElementRef;
  @ViewChild('logoAnimated') logoAnimated: ElementRef;
  @ViewChild('head') textHeadEl: ElementRef;
  @ViewChild('intro') introEl: ElementRef;
  @ViewChild('introDesc') introDescEl: ElementRef;
  @ViewChild('hiBackground') hiBackgroundEl: ElementRef;
  @ViewChild('leftNav') leftNavEl: ElementRef;

  // Global timelines
  public fullLogoTimeline = gsap.timeline({repeat: 0, delay: 1});
  public logoTimeline = gsap.timeline();
  public logoTimelineReversed = gsap.timeline({ paused: true });

  // Subscriptions and promises
  onResizeSub: Subscription;
  getSkeletonPro: Promise<void | QueryList<ElementRef>>;

	private get sectionHi(): any {
		return this._sectionHi.nativeElement;
  }
  
  constructor(private detector: ChangeDetectorRef, private utils: JJKUtilsService, private superSectionHi: ElementRef, private call: CallService) { 

    // Set correct strokes for logo animation
      this.primaryCircle = { 
        strokeDashOffset: {
          from: 315,
          to: 460
        }
      };
      this.secondaryCircle = { 
        strokeDashOffset: {
          from: 295,
          to: 160
        }
      };

  }

  async ngAfterViewInit(){

    // Wait until main will render skeleton
    await this.skeletons;

    this.skeletons.forEach((skeleton) => {
      if(skeleton.nativeElement.id == 'section-hi-skeleton'){
            
        this.skeleton = skeleton;

        this.animateSection();
        
        this.onResizeSub = this.call.onResizeNotifier.$.subscribe(bool => {
          this.onResize();
        });

      }
    });

  }

  async init(){
    return;
  }

  animateSection(): void{
    //console.log(this.scrollMouseSvg);
    let currentPos = document.documentElement.scrollTop || document.body.scrollTop;
      //this.animateOnScroll();
      this.animateScrollMouse();
      this.animateLogo();
      this.animateName();

  }

  // Scroll Mouse entry animation
  private animateScrollMouse(){
    
    // Desktop
    if(globals.device != 'mobileP'){
      let rect = this.scrollMouseSvg.nativeElement.children[0];
      let line = this.scrollMouseSvg.nativeElement.children[1];
      let linePos = line.getBoundingClientRect();
      let arrow = this.scrollMouseSvg.nativeElement.children[2];
      let arrowPos = arrow.getBoundingClientRect();
  
      // RECT ANIMATION
      let rectT = gsap.timeline({repeat: -1, yoyo: true, delay: 2});
      this.classicTweens.push(rectT);
      rectT.fromTo(rect, { transform: 'translateY(-1em)' }, { duration: 1.5, transform: 'translateY(0em)', ease: "power1.inOut" }, 0);
  
      // ARROW ANIMATION
      let timeline = gsap.timeline({repeat: -1, delay: 2});
      this.classicTweens.push(timeline);
      timeline
      // Appear
      .fromTo(line,                 {opacity: 0 }, { duration: 1, opacity: 0.33, ease: "expo.inOut" }, 0)
      .fromTo(arrow,                {opacity: 0 }, { duration: 1, opacity: 1, ease: "expo.inOut" }, 0)
  
      // Move down
      .fromTo(line,                 {height: "0em" }, { duration: 2, height: "8em", ease: "power1.in" }, 0)
  
      // Disappear
      .fromTo(line,                 {opacity: 0.33 }, { duration: 2, opacity: 0, ease: "expo.inOut" }, 1)
      .fromTo(arrow,                {opacity: 1 }, { duration: 2, opacity: 0, ease: "expo.inOut" }, 1)
    }

    // Mobile Portrait
    if(globals.device == 'mobileP'){

      let circle = this.scrollTouchEl.nativeElement.children[0];
      let touch = this.scrollTouchEl.nativeElement.children[1];

      // Circle animation
      let circleTimeline = gsap.timeline({repeat: -1, delay: 3});
      this.classicTweens.push(circleTimeline);
      circleTimeline

      // Show circle
      .fromTo(circle, { opacity: 0 }, { duration: 1, opacity: 1, ease: 'power2.inOut' }, 0)
      // Show touch
      .fromTo(touch, { opacity: 0, scale: 0.7 }, { duration: 0.4, opacity: 0.33, scale: 1, ease: 'power2.inOut' }, 1)

      // Move circle to the top and expand
      .fromTo(circle, { height: '2em' }, { duration: 1.5, height: '6em', ease: 'power2.in' }, 1)
      // Move touch to the top
      .fromTo(touch, { marginBottom: '0em' }, { duration: 1.2, marginBottom: '4em', ease: 'power2.in' }, 1)
      // Shrink circle
      .fromTo(circle, { height: '6em', marginBottom: '0em' }, { duration: 1, height: '2em', marginBottom: '4em', ease: 'power2.out', immediateRender: false }, 2.5)

      // Hide circle and touch
      .fromTo(touch, { opacity: 0.33, scale: 1 }, { duration: 0.4, opacity: 0, scale: 0.7, ease: 'power2.inOut', immediateRender: false }, 2.5)
      .fromTo(circle, { opacity: 1 }, { duration: 1.5, opacity: 0, ease: 'power2.out', immediateRender: false }, 4);

    }
    
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
    let timeline = this.fullLogoTimeline;
    this.classicTweens.push(timeline);
    timeline

    // Show me
    .set(this.logoAnimated.nativeElement, { left: window.innerWidth/2-this.logoAnimated.nativeElement.offsetWidth*2/2+'px' })
    .fromTo(this._sectionHi.nativeElement, { backgroundColor: 'rgba(0, 20, 39, 1)' }, { duration: 0.5, backgroundColor: 'rgba(0, 20, 39, 0)', ease: "linear.inOut" }, 2)


    // Logo Timeline
    this.logoTimeline
    .fromTo(mainRect, { bottom: mainRect.getBoundingClientRect().bottom+'em' }, { duration: 0.2, bottom: '6em', ease: "power1.in" }, 0)
    .set(mainJLower, { opacity: 1 }, 0.2)
    .fromTo(mainJLower.children[1], { strokeDashoffset: this.primaryCircle.strokeDashOffset.from}, { duration: 0.5, strokeDashoffset: this.primaryCircle.strokeDashOffset.to, ease: "power1.out" }, 0.2)
    .fromTo(mainJUpper, { transform: 'scale(0)'}, { duration: 0.5, transform: 'scale(1)', ease: "back(4).out" }, 1)
    .fromTo(mainRect, {  }, { duration: 0.5,  height: '0em', ease: "power2.out" }, 0.7)
    .set(secondaryCircle, { opacity: 1 }, 0.5)
    .fromTo(secondaryCircle.children[1], { strokeDashoffset: this.secondaryCircle.strokeDashOffset.from}, { duration: 0.5, strokeDashoffset: this.secondaryCircle.strokeDashOffset.to, ease: "power1.out" }, 0.5)
    .fromTo(secondaryPoint, { transform: 'scale(0)'}, { duration: 0.5, transform: 'scale(1)', ease: "back(4).out" }, 0.8)
    .fromTo(secondaryRect, { height: '0em'}, { duration: 0.5, height: '3em', ease: "power1.out" }, 1.2);
  
    // Reversed Logo Timeline
    this.logoTimelineReversed
    .fromTo(secondaryRect, { height: '3em', ease: "power1.out" }, { duration: 0.5, immediateRender: false, height: '0em'}, 0)
    .fromTo(secondaryPoint, { scale: 1 }, { duration: 0.5, scale: 0, immediateRender: false, }, 0.4)
    .fromTo(secondaryCircle.children[1], { strokeDashoffset: this.secondaryCircle.strokeDashOffset.to, ease: "power1.out" }, { duration: 0.5, strokeDashoffset: this.secondaryCircle.strokeDashOffset.from}, 0.5)
    .fromTo(secondaryCircle, { opacity: 1 }, { duration: 0, immediateRender: false, opacity: 0 }, 1)
    .fromTo(mainJUpper, { transform: 'scale(1)' }, { immediateRender: false, duration: 0.5, transform: 'scale(0)' }, 0.2)
    .to(mainRect, { duration: 0.5, height: 'auto' }, 0.5)
    .fromTo(mainJLower, { opacity: 1 }, { duration: 0, immediateRender: false, opacity: 0 }, 1.5)
    .fromTo(mainJLower.children[1], { strokeDashoffset: this.primaryCircle.strokeDashOffset.to }, { duration: 0.5, strokeDashoffset: this.primaryCircle.strokeDashOffset.from}, 1)
    .to(mainRect, { duration: 0.3, bottom: '100%' }, 1.5);
    this.classicTweens.push(this.logoTimelineReversed);

    timeline
    .add(this.logoTimeline, 0)
    // Logo - zoom out
    .fromTo(this.logoAnimated.nativeElement, { transform: 'scale(2)', left: window.innerWidth/2-this.logoAnimated.nativeElement.offsetWidth*2/2+'px' }, { duration: 0.7, transform: 'scale(1)', left: x+'px', ease: "power3.inOut" }, 1.7)

    // Show text
    .fromTo(this.introEl.nativeElement, { opacity: 0 }, { duration: 0.7, opacity: 1, ease: "power3.inOut" }, 1.7)
    .fromTo(this.introDescEl.nativeElement, { opacity: 0 }, { duration: 0.7, opacity: 1, ease: "power3.inOut" }, 1.7)
    .fromTo(this.scrollTouchEl.nativeElement, { opacity: 0 }, { duration: 0.7, opacity: 1, ease: "power3.inOut" }, 1.7)

    // Show bars
    .set(this._sectionHi.nativeElement, { zIndex: 0 }, 2.5)
    .fromTo(this.leftNavEl.nativeElement, { opacity: 0 }, { duration: 0.5, opacity: 1, ease: "power3.inOut" }, 2)
    
    // ScrollTrigger logo after animation
    .call(() => { this.animateOnScroll(); }, [], 2.4);

  }

  private animateName(){

    let removeLetterTime: number = 0.1;
    let addLetterTime: number = 0.2;
    let waitTime: number = 3;

    // Blink cursor
    let timeline = gsap.timeline({repeat: -1, delay: 2});
    this.classicTweens.push(timeline);
    timeline.to(this.textHeadEl.nativeElement, { duration: 0.1, opacity: 1 }, 0.5)
    timeline.to(this.textHeadEl.nativeElement, { duration: 0.1, opacity: 0 }, 1);

    // Change names
    let changeNameTimeline = gsap.timeline({repeat: -1, delay: 1});
    this.classicTweens.push(changeNameTimeline);
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

  private animateOnScroll(){
    
    let textTimeline = gsap.timeline({ paused: true })
    .fromTo(this.hiBackgroundEl.nativeElement, { opacity: 1, backgroundSize: this.backgroundSize+"%", backgroundPositionY: 'bottom' }, { duration: 0.5, opacity: 0, backgroundSize: (this.backgroundSize-10)+'%', backgroundPositionY: '95%' }, 0.5)
    .fromTo(this.introEl.nativeElement, { width: 'auto' }, { duration: 0.5, width: '0' }, 0.5)
    .fromTo(this.introDescEl.nativeElement.children[0], { width: 'auto' }, { duration: 0.5, width: '0' }, 1)
    .fromTo(this.introDescEl.nativeElement.children[1], { width: 'auto' }, { duration: 0.5, width: '0' }, 1.2)
    .fromTo(this.scrollMouseSvg.nativeElement, { transform: 'translateY(0em)', opacity: 1 }, { duration: 0.5, transform: 'translateY(-3em)', opacity: 0 }, 0.2)
    .fromTo(this.leftNavSocials.nativeElement, { transform: 'translateY(0em)', opacity: 1 }, { duration: 0.5, transform: 'translateY(3em)', opacity: 0 }, 0.5);

    if(globals.device == 'mobileP'){
      textTimeline
      .fromTo(this.superSectionHi.nativeElement, { margin: '1em', borderRadius: '2em' }, { duration: 0.5, margin: '0em', borderRadius: '0em' }, 1.2)
      .fromTo(this.scrollTouchEl.nativeElement, { opacity: 1 }, { duration: 0.3, opacity: 0 }, 0.2);
      
      this.call.sendMenuPosChange(this.sectionHi);
    }
    this.classicTweens.push(textTimeline);

    // Create a Logo scroll trigger animation
    ScrollTrigger.create({

      id: 'logoScrollTrigger',
      animation: this.logoTimelineReversed,
      trigger: this.skeleton.nativeElement,
      start: "center center",
      end: "center top",
      scrub: true, 
      markers: false

    });

    // Create a Text scroll trigger animation
    ScrollTrigger.create({

      id: 'sectionHiTextScrollTrigger',
      animation: textTimeline,
      trigger: this.skeleton.nativeElement,
      start: "center center",
      end: "center top",
      scrub: true, 
      markers: false

    });

    // // BG ANIMATION
    // let bgTween = gsap.fromTo(this.hiBackgroundEl.nativeElement, { opacity: 1, backgroundSize: this.backgroundSize+"%", backgroundPositionY: 'bottom' }, { opacity: 0, backgroundSize: (this.backgroundSize-10)+'%', backgroundPositionY: '95%' });
    // let bgSettings = { el: this.skeleton.nativeElement, tween: bgTween, duration: window.innerHeight*(0.5), triggerHook: "center", offset: window.innerHeight*(0.5), debug: false, origin: "top" };
    // this.animateScrollTween(bgSettings);

    // // TEXT ANIMATION
    // // Main intro
    // let textTitleTween = gsap.fromTo(this.introEl.nativeElement, { width: 'auto' }, { width: '0' });
    // let textTitleSettings = { el: this.skeleton.nativeElement, tween: textTitleTween, duration: window.innerHeight*(0.25), triggerHook: "center", offset: window.innerHeight*(0.75), debug: false, origin: "top" };
    // this.animateScrollTween(textTitleSettings);

    // // Desc intro 1
    // let textDesc1Tween = gsap.fromTo(this.introDescEl.nativeElement.children[0], { width: 'auto' }, { width: '0' });
    // let textDesc1Settings = { el: this.skeleton.nativeElement, tween: textDesc1Tween, duration: window.innerHeight*(0.25), triggerHook: "center", offset: window.innerHeight*(0.65), debug: false, origin: "top" };
    // this.animateScrollTween(textDesc1Settings);

    // // Desc intro 2
    // let textDesc2Tween = gsap.fromTo(this.introDescEl.nativeElement.children[1], { width: 'auto' }, { width: '0' });
    // let textDesc2Settings = { el: this.skeleton.nativeElement, tween: textDesc2Tween, duration: window.innerHeight*(0.25), triggerHook: "center", offset: window.innerHeight*(0.5), debug: false, origin: "top" };
    // this.animateScrollTween(textDesc2Settings);

    // // LEFT MENU ANIMATION
    // // Scroll Mouse
    // let scrollMouseTween = gsap.fromTo(this.scrollMouseSvg.nativeElement, { transform: 'translateY(0em)', opacity: 1 }, { transform: 'translateY(-3em)', opacity: 0 });
    // let scrollMouseSettings = { el: this.skeleton.nativeElement, tween: scrollMouseTween, duration: window.innerHeight*(0.25), triggerHook: "center", offset: window.innerHeight*(0.5), debug: false, origin: "top" };
    // this.animateScrollTween(scrollMouseSettings);

    // // Social Medias
    // let socialsTween = gsap.fromTo(this.leftNavSocials.nativeElement, { transform: 'translateY(0em)', opacity: 1 }, { transform: 'translateY(3em)', opacity: 0 });
    // let socialsSettings = { el: this.skeleton.nativeElement, tween: socialsTween, duration: window.innerHeight*(0.25), triggerHook: "center", offset: window.innerHeight*(0.75), debug: false, origin: "top" };
    // this.animateScrollTween(socialsSettings);

    // // (mobileP only)
    // if(globals.device == 'mobileP'){

    //   // Gradient background animation.fromTo(this.superSectionHi.nativeElement, { margin: '1em', borderRadius: '2em' }, { margin: '0em', borderRadius: '0em' })
    //   let gradientBgTween = gsap;
    //   let gradientBgSettings = { el: this.skeleton.nativeElement, tween: gradientBgTween, duration: window.innerHeight*(0.25), triggerHook: "center", offset: window.innerHeight*(0.75), debug: false, origin: "top" };
    //   this.animateScrollTween(gradientBgSettings);

    //   // Change menu positions
    //   this.call.sendMenuPosChange(this.sectionHi);

    //   // Hide scroll touch
    //   let hideScrollTouchTween = gsap.fromTo(this.scrollTouchEl.nativeElement, { opacity: 1 }, { opacity: 0 });
    //   let hideScrollTouchSettings = { el: this.skeleton.nativeElement, tween: hideScrollTouchTween, duration: window.innerHeight*(0.1), triggerHook: "center", offset: window.innerHeight*(0.55), debug: false, origin: "top" };
    //   this.animateScrollTween(hideScrollTouchSettings);

    // }
  }

  onResize(): void{
    
    let unload = () => {

      // Erase name
      this.currentNameVal = "";

      // Unload classic tweens
      for(let i = this.classicTweens.length-1; i>=0; i--){

        this.classicTweens[i].kill();
        this.classicTweens.splice(i, 1);

      }

      set();
    }

    let set = () => {

      // Set position of logo
      let x = this.logoSkeleton.nativeElement.getBoundingClientRect().left;
      let height = this.logoSkeleton.nativeElement.getBoundingClientRect().bottom;
      this.logoPos = x;
      this.logoHeight = height;

      // Set background position depending on device
      if(globals.device == 'mobileP'){
        this.backgroundSize = 128;
      } else{
        this.backgroundSize = 240;
      }

      load();

    }

    let load = () => {

      this.animateOnScroll();
      //this.animateSection();
      this.animateScrollMouse();
      this.animateName();

    }

    unload();

  }

  private animateScrollTween(settings): void{
    this.scrollTweens.push(new ScrollGSAPService(settings));
    this.scrollTweens[this.scrollTweens.length-1].animate();
  }
}
