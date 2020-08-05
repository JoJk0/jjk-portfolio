import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, AfterViewInit, QueryList, ViewChildren, Input } from '@angular/core';
import { gsap } from 'gsap'
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { ScrollGSAPService } from '../scroll-gsap.service';
import { NoopScrollStrategy } from '@angular/cdk/overlay';
import { SwiperOptions } from 'swiper';
import { ScrollTrigger } from "gsap/ScrollTrigger";

@Component({
  selector: 'app-section-skills',
  templateUrl: './section-skills.component.html',
  styleUrls: ['./section-skills.component.scss']
})
export class SectionSkillsComponent implements AfterViewInit, OnInit {

  @Input() skeletons: QueryList<ElementRef>;
  
  // Elements
  @ViewChild('mySkillsButton', {read: ElementRef}) mySkillsButton: ElementRef;
  @ViewChild('mySkills', {read: ViewContainerRef}) target: ViewContainerRef;
  @ViewChild('mySkillsBackground', {read: ElementRef}) mySkillsBackground: ElementRef;
  @ViewChild('mySkills', {read: ElementRef}) _mySkillsEl: ElementRef;
  @ViewChildren('skillCloud') skillCloudsEl: QueryList<ElementRef>;

  // Animated elements
  @ViewChild('skillsTitle') skillsTitleEl: ElementRef;
  @ViewChild('skillsText') skillsTextEl: ElementRef;
  @ViewChildren('skill') skillsList: QueryList<ElementRef>;
  @ViewChild('otherSkills') otherSkillsEl: ElementRef;
  @ViewChild('paginator') paginatorEl: ElementRef;
  
  // Properties
  public skeleton: ElementRef;
  public scrollTweens: ScrollGSAPService[] = [];
  mySkillsPos: Object = {
    'position': 'fixed',
    'z-index': '16',
    'top': '0px',
    'left': '0px',
    'width': '0px',
    'height': '0px',
    'display': 'none'
  };

  mySkillsContainerStyle: Object = {
    'display': 'none'
  }

  config: SwiperOptions = {
    slidesPerView: 'auto',
    pagination: { el: '.swiper-pagination', clickable: true },
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    centeredSlides: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: -90
  };
  

  constructor(public dialog: MatDialog, private location: Location) { }

  private get sectionSkills(): any{
    return this._mySkillsEl.nativeElement;
  }


  ngOnInit(){

  }

  async ngAfterViewInit() {

    await this.skeletons;

    this.skeletons.forEach((skeleton) => {
      if(skeleton.nativeElement.id == 'section-skills-skeleton'){
            
        this.skeleton = skeleton;
        this.animateBackground();
        this.animateOnScrollOut();
        this.animateOnScroll();
        
        // this.onResizeSub = this.call.onResizeNotifier.$.subscribe(bool => {
        //   this.onResize();
        // });

      }
    });

  }

  openMySkills(): void{

    // Set new Pos of style
    let el = this.mySkillsButton.nativeElement;
    let coords = el.getBoundingClientRect();
    this.mySkillsPos = {

      'position': 'fixed',
      'z-index': '21',
      'top': coords.top+'px',
      'left': (coords.left+(el.offsetWidth/2)-(el.offsetHeight/2))+'px',
      'width': el.offsetHeight+'px',
      'height': el.offsetHeight+'px',
      'display': 'block'

    }

    let transformOptions = {
      duration: 0.7, 
      scale: 50
    };
    let transformOptionsOut = {
      duration: 0.4, 
      scale: 0
    };
    gsap.to(this.mySkillsBackground.nativeElement, transformOptions);

    setTimeout(() => {
          const dialogRef = this.dialog.open(MySkillsComponent, {
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          backdropClass: 'dialogBackdrop',
          panelClass: 'my-skills-container',
          id: 'my-skills-container',
          scrollStrategy: new NoopScrollStrategy
      });
      this.location.go("/skills");

      dialogRef.afterClosed().subscribe(result => {
        gsap.to(this.mySkillsBackground.nativeElement, transformOptionsOut);
        this.location.go("/");
      });
      
    }, 200);
    //let childComponent = this.componentFactoryResolver.resolveComponentFactory(MySkillsComponent);
    //this.target.clear();
    //this.componentRef = this.target.createComponent(childComponent);
    //console.log(this.componentRef); 
    //this.buttonSkillsOpen = true;

  }

  animateBackground(): void{

    gsap.registerPlugin(MotionPathPlugin);

    this.skillCloudsEl.forEach((skillCloud) => {

      // Randomize motion
      let duration: number = Math.floor(Math.random() * Math.floor(5))+30; // <30,35>
      let startAt: number = Math.floor(Math.random() * Math.floor(3)); // <0,3>
      let clockwise: boolean = Math.floor(Math.random() * Math.floor(2)) ? true : false; // {0,1}
      let path: string;
      if(clockwise){
        path = "M 100 250 C 100 180 200 180 200 250 A 50 50 0 1 1 100 250";
      } else{
        path = "M 100 250 C 100 320 200 320 200 250 A 50 50 0 1 0 100 250";
      }

      let timeline = gsap.timeline({ repeat: -1, delay: startAt });
      timeline
      // .fromTo(skillCloud.nativeElement, { translateY: '0em' }, { duration: duration*0.25, translateY: '1em', ease: 'none' }, 0)
      // .fromTo(skillCloud.nativeElement, { translateX: '0em' }, { duration: duration*0.25, translateX: '1em', ease: 'power2.inOut' }, 0)

      // .fromTo(skillCloud.nativeElement, { translateY: '1em' }, { duration: duration*0.25, translateY: '2em', ease: 'none' }, duration*0.25)
      // .fromTo(skillCloud.nativeElement, { translateX: '1em' }, { duration: duration*0.25, translateX: '0em', ease: 'power2.inOut' }, duration*0.25)

      // .fromTo(skillCloud.nativeElement, { translateY: '2em' }, { duration: duration*0.25, translateY: '1em', ease: 'none' }, duration*0.5)
      // .fromTo(skillCloud.nativeElement, { translateX: '0em' }, { duration: duration*0.25, translateX: '-1em', ease: 'power2.inOut' }, duration*0.5)

      // .fromTo(skillCloud.nativeElement, { translateY: '1em' }, { duration: duration*0.25, translateY: '0em', ease: 'none' }, duration*0.75)
      // .fromTo(skillCloud.nativeElement, { translateX: '-1em' }, { duration: duration*0.25, translateX: '0em', ease: 'power2.inOut' }, duration*0.75);
      .fromTo(skillCloud.nativeElement, { motionPath: { path: path } }, { duration: duration, motionPath: { path: path }, ease: 'none' }, 0);

    });

  }

  animateOnScroll(){

    let startAt: number = window.innerHeight*2;
    let d: number = window.innerHeight;

    let skillsTimeline = gsap.timeline({ paused: true })

    // TEXT
    // SkillsTitle
    .fromTo(this.skillsTitleEl.nativeElement, { width: '0em' }, { duration: 0.25, width: 'auto'}, 0)

    // SkillsText
    .fromTo(this.skillsTextEl.nativeElement, { width: '0em' }, { duration: 0.25, width: 'auto'}, 0.05);
    
    // Skill animation
    let diff = 0.0;
    this.skillsList.forEach((skillEl) => {
      let bg1 = skillEl.nativeElement.children[0].children[1];
      let bg2 = skillEl.nativeElement.children[0].children[2];
      let bg3 = skillEl.nativeElement.children[0].children[3];
      let text = skillEl.nativeElement.children[1].children[0];

      skillsTimeline
      .fromTo(bg1, { scale: '0' }, { duration: 0.2, scale: '1.2', ease: 'back.out(3)'}, diff)
      .fromTo(bg2, { scale: '0' }, { duration: 0.2, scale: '1.2', ease: 'back.out(3)'}, 0.02+diff)
      .fromTo(bg3, { scale: '0' }, { duration: 0.2, scale: '1.2', ease: 'back.out(3)'}, 0.04+diff)
      .fromTo(text, { scale: '0' }, { duration: 0.2, scale: '1', ease: 'back.out(3)'}, 0.02+diff);

      diff = diff+0.05;

    });

    // Background
    skillsTimeline
    .fromTo(this.otherSkillsEl.nativeElement, { opacity: 0 }, { duration: 0.15, opacity: 1 }, 0)
    
    // Paginator (mobile)
    .fromTo(this.paginatorEl.nativeElement, { opacity: 0 }, { duration: 0.15, opacity: 1 }, 0);

        // Create a Skills scroll trigger animation
        ScrollTrigger.create({

          id: 'skillsScrollTrigger',
          animation: skillsTimeline,
          trigger: this.skeleton.nativeElement,
          start: "top center",
          end: "center center",
          scrub: true, 
          markers: false
    
        });

  }

  animateOnScrollOut(): void{

    let startAt: number = window.innerHeight*2;
    let d: number = window.innerHeight;

    let skillsTimelineReversed = gsap.timeline({ paused: true });

    // Skills
    let diff = 0.25;
    this.skillsList.forEach((skillEl) => {

      let bg1 = skillEl.nativeElement.children[0].children[1];
      let bg2 = skillEl.nativeElement.children[0].children[2];
      let bg3 = skillEl.nativeElement.children[0].children[3];
      let text = skillEl.nativeElement.children[1].children[0];

      skillsTimelineReversed
      .fromTo(bg1, { scale: '1.2' }, { duration: 0.2, scale: '0', ease: 'back.in(3)'}, diff)
      .fromTo(bg2, { scale: '1.2' }, { duration: 0.2, scale: '0', ease: 'back.in(3)'}, 0.02+diff)
      .fromTo(bg3, { scale: '1.2' }, { duration: 0.2, scale: '0', ease: 'back.in(3)'}, 0.04+diff)
      .fromTo(text, { scale: '1' }, { duration: 0.2, scale: '0', ease: 'back.in(3)'}, 0.02+diff);

      diff = diff+0.05;

    });

    // Background
    skillsTimelineReversed
    .fromTo(this.otherSkillsEl.nativeElement, { duration: 0.15, opacity: 1 }, { opacity: 0 }, 0.35)

    // Paginator (mobile)
    .fromTo(this.paginatorEl.nativeElement, { duration: 0.15, opacity: 1 }, { opacity: 0 }, 0.35)

    // TEXT
    // SkillsTitle
    .fromTo(this.skillsTitleEl.nativeElement, { duration: 0.25, width: 'auto' }, { width: '0em'}, 0.35)

    // SkillsText
    .fromTo(this.skillsTextEl.nativeElement, { duration: 0.25, width: 'auto' }, { width: '0em'}, 0.35);

            // Create a Skills reversed scroll trigger animation
            ScrollTrigger.create({

              id: 'skillsReversedScrollTrigger',
              animation: skillsTimelineReversed,
              trigger: this.skeleton.nativeElement,
              start: "center center",
              end: "center top",
              scrub: true, 
              markers: false
        
            });

  }

}
