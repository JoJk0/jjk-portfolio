import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ComponentFactoryResolver, ComponentRef, ViewContainerRef, ComponentFactory, ViewChildren, QueryList, HostListener, Input } from '@angular/core';
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

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})

export class MainComponent implements AfterViewInit, OnInit {
  
  // Section refs
  @ViewChildren('scrollable', {read: ElementRef})
  sections: QueryList<ElementRef>;

  private componentRef: ComponentRef<any>;

  public currentSection: string;

  // Subscriptions
  navToSub: Subscription;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, public dialog: MatDialog, private jsonData: DataJsonService, private location: Location, private route: ActivatedRoute, private router: Router, private callService: CallService) { }

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

    this.updateCurrentSection();

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
    let currentSectionEl: ElementRef;
    let currentPos = window.pageYOffset || document.documentElement.scrollTop;
    this.sections.forEach((section) => {
      let sectionPos = section.nativeElement.getBoundingClientRect();
      if(currentPos >= sectionPos.top && currentPos < sectionPos.bottom){
        currentSectionEl = section;
      }
    });
    this.currentSection = currentSectionEl.nativeElement.id;
    this.callService.sendCurrentSection(this.currentSection);
  }

}