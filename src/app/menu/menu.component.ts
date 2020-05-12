import { Component, OnInit, HostListener, ViewChild, ElementRef, ViewChildren, QueryList, ChangeDetectorRef, Inject, forwardRef } from '@angular/core';
import { gsap } from 'gsap';
import { MatTooltip } from '@angular/material/tooltip';
import { MainComponent } from '../main/main.component';
import { CallService } from '../call.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  // Elements
  @ViewChild('animatingLine') animatingLineEl: ElementRef;
  @ViewChild('bullets') bulletsEl: ElementRef;
  @ViewChild('hamburger') hamburgerEl: ElementRef;
  @ViewChildren('bullet') bulletsRef: QueryList<ElementRef>;

  // Properties
  progressbarHeight: number;
  lineTop: number = 0;
  lineLeft: number = 0;
  currentSection: string;

  // States
  opened: boolean = false;
  openedB: boolean[] = [false, false, false, false];
  openedBShow: boolean[] = [false, false, false, false];
  animating: boolean;

  // Subscriptions
  currentSectionSub: Subscription;

  constructor(private detector: ChangeDetectorRef, public callService: CallService) { 
    
  }

  ngOnInit(): void {
    this.currentSectionSub = this.callService.getCurrentSection().subscribe(section => {
      this.changeSection(section.id);   
    });
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(targetElement: string) {
    this.progressbarUpdate();
  }
  
  progressbarUpdate(): void{
    let currentPos = window.pageYOffset || document.documentElement.scrollTop;
    let pageHeight = document.body.firstElementChild.getBoundingClientRect().height;
    currentPos = currentPos+(document.body.clientHeight*(currentPos/(pageHeight-document.body.clientHeight)));
    let progress = (currentPos/pageHeight)*100;
    this.progressbarHeight = progress;
  }

  toggleMenu(): void{
    if(!this.animating){
      this.animating = true;
      this.openedBShow.forEach((b, i = 0) => {
        this.openedBShow[i] = true;
      });
  
      let hamburgerPosBot: number = this.hamburgerEl.nativeElement.getBoundingClientRect().bottom;
      let bulletsPosTop: number = this.bulletsEl.nativeElement.getBoundingClientRect().top-(this.hamburgerEl.nativeElement.getBoundingClientRect().height*2);
      let duration: number = 1;
  
      let initLineTop = hamburgerPosBot+(this.hamburgerEl.nativeElement.getBoundingClientRect().height*0.3);
      this.lineTop = initLineTop;
      this.lineLeft = this.hamburgerEl.nativeElement.getBoundingClientRect().left+(this.hamburgerEl.nativeElement.getBoundingClientRect().width/2); 
  
      let animation: gsap.core.Timeline = gsap.timeline();
      let tween1From: Object;
      let tween1To: Object;
      let tween2From: Object;
      let tween2To: Object;
  
      tween1From =  { duration: duration/2, height: '0px' ,                             top: initLineTop+'px'};
      tween1To =    { duration: duration/2, height: (bulletsPosTop-this.lineTop)+'px',  top: initLineTop+'px'};
      tween2From =  { duration: duration/2, height: (bulletsPosTop-this.lineTop)+'px',  top: initLineTop+'px'} ;
      tween2To =    { duration: duration/2, height: '0px',                              top: bulletsPosTop+'px'};
  
      if(!this.opened){
        animation
        .fromTo(this.animatingLineEl.nativeElement, tween1From, tween1To, 0)
        .call(() => {
          this.opened = this.opened == true ? false : true;
          this.detector.detectChanges();
        }, [], 0.3)
        .fromTo(this.animatingLineEl.nativeElement, tween2From, tween2To, duration/2)
        .call(() => {
          this.bulletsRef.forEach((bullet, i=1) => {
            setTimeout(() => {
              if(this.opened){
                this.openedB[i-1] = true;
              } else{
                this.openedB[i-1] = false;
              }
              this.detector.detectChanges();
            }, 150*i);
            i++;     
          });
          this.animating = false;
        }, [], duration*0.6);
      } else{
        animation
        .call(() => {
          this.bulletsRef.forEach((bullet, i=1) => {
            setTimeout(() => {
              this.openedB[i-1] = false;
              this.detector.detectChanges();
            }, 150*i);
            i++;     
          });
        }, [], 0)
        .fromTo(this.animatingLineEl.nativeElement, tween2To, tween2From, 0)
        .call(() => {
          this.opened = this.opened == true ? false : true;
          this.detector.detectChanges();
        }, [], duration*0.8)
        .fromTo(this.animatingLineEl.nativeElement, tween1To, tween1From, duration/2)
        .call(() => {
          this.openedBShow.forEach((b, i = 0) => {
            this.openedBShow[i] = false;
          });
          this.detector.detectChanges();
          this.animating = false;
        }, [], duration);
      }
    }

  }

  navigateTo(page: string){
    this.callService.sendNavTo(page);
  }

  changeSection(section: string){
    this.currentSection = section;
  }
  
}
