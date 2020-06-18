import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ComponentFactory, ViewChildren, QueryList, HostListener, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { SectionHiComponent } from '../section-hi/section-hi.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { gsap } from 'gsap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtViewComponent } from '../art-view/art-view.component';
import { Projects } from '../projects';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { CallService } from '../call.service';
import { Subscription } from 'rxjs';
import { ScrollGSAPService } from '../scroll-gsap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit, OnInit {
  
  @Output() menuChangePosEmitter = new EventEmitter<ElementRef>();
  
  // Section refs
  @ViewChildren('scrollable', {read: ElementRef}) sections: QueryList<ElementRef>;
  @ViewChildren('skeleton', {read: ElementRef}) skeletons: QueryList<ElementRef>;

  // Scrollable tweens
  public scrollTweens: ScrollGSAPService[] = [];

  // Global vars
  public currentSection: string;
  public sectionHeights: number[] = [0,0,0,0];

  // Local vars
  private projectsNo: number;

  // Subscriptions
  navToSub: Subscription;
  onResizeSub: Subscription;
  sendSkeletonSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public dialog: MatDialog, private jsonData: DataJsonService, private location: Location, private route: ActivatedRoute, private router: Router, private callService: CallService, private detector: ChangeDetectorRef) { }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(targetElement: string) {
    this.updateCurrentSection();
  }

  ngOnInit(): void{
    this.navToSub = this.callService.getNavTo().subscribe(section => {
      this.navigateTo(section.id);   
    });
  }
  
  ngAfterViewInit(): void { 

    setTimeout(() => {
      this.updateCurrentSection();
    }, 0);

    // Set skeleton heights
    this.updateSkeleton();

    setTimeout(() => {
      // this.animateScrollTransitions();
    }, 0);

    this.onResizeSub = this.callService.onResizeNotifier.$.subscribe(bool => {
      this.onResize();
    });

    // Send skeleton to section
    // this.sendSkeletonSub = this.callService.getSkeleton.$.subscribe(section => {
    //   console.log('skeleton');
    //   this.skeletons.forEach((skeleton) => {
    //     if(skeleton.nativeElement.id = section+'-skeleton'){
    //       this.callService.sendSkeleton.send(skeleton);
    //       this.sendSkeletonSub.unsubscribe();
    //     } else{
    //       console.error("JJK: Cannot find specified skeleton: "+section);
    //     }
    //   });
    // });

  }

  getElement(name: string = ''): ElementRef{
    let el: ElementRef;
    this.sections.toArray().forEach((section) => {
      if(section.nativeElement.id == "start" && name == ''){
        el = section
      } else if(section.nativeElement.id == name){
        el = section;
      }
    });
    return el;
  }

  navigateTo(sectionName: string){
    // Get section
    let sectionEl: ElementRef = this.sections.find(sectionID => sectionID.nativeElement.id == sectionName);
    if(sectionEl){
      sectionEl.nativeElement.scrollIntoView();
    }
  }

  updateCurrentSection(){
    // let currentSectionEl: ElementRef;
    // let currentPos = window.pageYOffset || document.documentElement.scrollTop;
    // this.skeletons.forEach((section) => {
    //   let sectionPos = section.nativeElement.getBoundingClientRect();
    //   if(currentPos >= sectionPos.top && currentPos < sectionPos.bottom){
    //     currentSectionEl = section;
    //   }
    // });
    // setTimeout(() => {
    //   this.currentSection = currentSectionEl.nativeElement.id;
    //   this.callService.sendCurrentSection(this.currentSection);
    // }, 0);
  }

  private updateSkeleton(): void{
    this.sections.forEach((section, i=0) => {
      let height = section.nativeElement.offsetHeight;
      this.sectionHeights[i] = height;
      this.detector.detectChanges();
    });
    this.callService.sendSkeleton(this.skeletons);
  }

  animateScrollTransitions(): void{

    let duration = window.innerHeight/2;

    this.skeletons.forEach((skeleton, i=(this.skeletons.length-1)) => {

      this.sections.forEach((section, j=(this.sections.length-1)) => {
        if(i == j){
          // Show
          let tween = gsap.fromTo(section.nativeElement, { zIndex: -(i+1) }, { zIndex: i+1 });
          let animateScrollInSettings = { el: skeleton.nativeElement, tween: tween, duration: 0, triggerHook: "bottom", offset: duration, debug: false, origin: 'top' };
          this.animateScrollTween(animateScrollInSettings);
          // Hide
          let tween2 = gsap.fromTo(section.nativeElement, { zIndex: i+1 }, { immediateRender: false, zIndex: -(i+1) });
          let animateScrollOutSettings = { el: skeleton.nativeElement, tween: tween2, duration: 0, triggerHook: "bottom", offset: duration, debug: false, origin: 'bottom' };
          this.animateScrollTween(animateScrollOutSettings);
        }
        j = j-1;
      });

      i = i-1;
    });

  }

  onProjectsLoad(projectsNo: number){

    this.projectsNo = projectsNo;

    this.sectionHeights[2] = window.innerHeight+window.innerHeight*0.8*(projectsNo-1);
    this.detector.detectChanges();
    this.animateScrollTransitions();
    setTimeout(() => {
      this.detector.detectChanges();
    }, 0);

  }

  emitMenuChangePos(sectionRef: ElementRef){
    this.menuChangePosEmitter.emit(sectionRef);
  }

  onResize(): void{

    let unload = () => {
      this.scrollTweens.forEach((scrollTween) => {
        let index = this.scrollTweens.indexOf(scrollTween);
        scrollTween.kill();
        this.scrollTweens.splice(index, 1);
      });
      this.scrollTweens = [];
      load();
    }

    let load = () => {
      this.updateSkeleton();
      this.onProjectsLoad(this.projectsNo);
    }

    unload();

  }

  private animateScrollTween(settings): void{
    let scrollTween = new ScrollGSAPService(settings);
    this.scrollTweens.push(scrollTween);
    scrollTween.animate();
  }

}