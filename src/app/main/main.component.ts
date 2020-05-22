import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ComponentFactory, ViewChildren, QueryList, HostListener, Input, ChangeDetectorRef } from '@angular/core';
import { SectionHiComponent } from '../section-hi/section-hi.component';
import { MySkillsComponent } from '../my-skills/my-skills.component';
import { gsap } from 'gsap';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ArtViewComponent } from '../art-view/art-view.component';
import { Projects } from '../projects';
import { DataJsonService } from '../data-json.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CallService } from '../call.service';
import { Subscription } from 'rxjs';
import { ScrollGSAPService } from '../scroll-gsap.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit, OnInit {
  
  // Section refs
  @ViewChildren('scrollable', {read: ElementRef}) sections: QueryList<ElementRef>;
  @ViewChildren('skeleton', {read: ElementRef}) skeletons: QueryList<ElementRef>;

  // Global vars
  public currentSection: string;
  public sectionHeights: number[] = [0,0,0,0];

  // Subscriptions
  navToSub: Subscription;

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

    this.animateScrollTransitions();

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
      setTimeout(() => {
        let height = section.nativeElement.offsetHeight;
        this.sectionHeights[i] = height;
        //console.log(this.sectionHeights);
        this.detector.detectChanges();
      }, 0);
    });
  }

  animateScrollTransitions(): void{

    let duration = window.innerHeight/2;

    this.skeletons.forEach((skeleton, i=0) => {

      this.sections.forEach((section, j=0) => {
        if(i == j){
          // Show
          let tween = gsap.to(section.nativeElement, { zIndex: 0 });
          ScrollGSAPService.animate(skeleton.nativeElement, tween, 0, "bottom", duration, false, 'top');
          // Hide
          let tween2 = gsap.to(section.nativeElement, { zIndex: -1 });
          ScrollGSAPService.animate(skeleton.nativeElement, tween2, 0, "bottom", duration, false, 'bottom');
        }
      });

    });

    // // In
    // let tween2 = gsap.to(el, { opacity: 1 ,ease: 'power2.in'});
    // ScrollGSAPService.animate(el, tween2, duration, "center", -duration/2, false, 'top');

    //  // Out
    // let tween = gsap.to(el, { opacity: 0, ease: 'power2.out' });
    // ScrollGSAPService.animate(el, tween, duration, "center", 0, false);
    
  }

}